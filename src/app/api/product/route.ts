import { isRequired } from "@/utils/function";
import { PrismaClient } from "@prisma/client";
import { mkdir, stat, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
const bcrypt = require("bcryptjs");
const mime = require("mime");

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const skip = parseInt(url.searchParams.get("skip") || "0");
    const take = parseInt(url.searchParams.get("take") || "0");
    const takeQuery = take ? { take: take } : null;

    const products = await prisma.product.findMany({
      skip,
      ...takeQuery,
      where: { deleted: false },
      orderBy: { id: "desc" },
    });
    return NextResponse.json(
      { code: 200, message: "Read data product success", data: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { code: 409, message: error, data: [] },
      { status: 409 }
    );
  }
}

const uploadImage = async (file: File) => {
  const path = `upload`;
  const uploadDir = join(process.cwd(), "public", path);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    }
  }
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${file.name.replace(
    /\.[^/.]+$/,
    ""
  )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
  await writeFile(`${uploadDir}/${filename}`, buffer);
  return `/${path}/${filename}`;
};

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const name: any = body.get("name");
    const image = body.get("image");
    const price: any = body.get("price");
    const isActive: any = body.get("isActive");
    const path = `upload`;
    const file: File | null = image as unknown as File;
    let imageData = `/${path}/default.png`;

    if (file) {
      imageData = await uploadImage(file);
    }

    isRequired({ name: name }, "name");

    const ress = await prisma.product.create({
      data: {
        name,
        image: imageData,
        price: parseInt(price),
        isActive: isActive === "true",
      },
    });
    return NextResponse.json(
      { code: 200, message: "Create data product success", data: ress },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { code: 409, message: error?.message, data: [] },
      { status: 409 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.formData();
    const name: any = body.get("name");
    const id: any = body.get("id");
    const image = body.get("image");
    const price: any = body.get("price");
    const isActive: any = body.get("isActive");
    const file: File | null = image as unknown as File;
    let imageData = {};

    if (file) {
      imageData = { image: await uploadImage(file) };
    }

    isRequired({ name: name }, "name");

    const ress = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        ...imageData,
        price: parseInt(price),
        isActive: isActive === "true",
      },
    });
    return NextResponse.json(
      { code: 200, message: "Update data product success", data: ress },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { code: 409, message: error?.message, data: [] },
      { status: 409 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    if (!url.searchParams.get("id")) throw new Error(`id is required`);
    const id = parseInt(url.searchParams.get("id") || "");

    const ress = await prisma.product.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
    return NextResponse.json(
      { code: 200, message: "Delete data product success", data: ress },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { code: 409, message: error?.message, data: [] },
      { status: 409 }
    );
  }
}
