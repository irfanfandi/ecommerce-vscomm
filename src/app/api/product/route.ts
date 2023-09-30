import { isBoolean, isNumber, isRequired } from "@/utils/function";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const skip = parseInt(url.searchParams.get("skip") || "0");
    const take = parseInt(url.searchParams.get("take") || "0");
    const search = url.searchParams.get("search");

    const products = await prisma.product.findMany({
      where: { deleted: false },
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, image, price, isActive } = body;

    isRequired(body, "name");
    isNumber(price, "price");
    isBoolean(isActive, "isActive");

    const ress = await prisma.product.create({
      data: {
        name,
        image,
        price,
        isActive,
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
    const body = await req.json();
    const { id, name, image, price, isActive } = body;

    isRequired(body, "id");
    isRequired(body, "name");
    isNumber(price, "price");
    isBoolean(isActive, "isActive");

    const ress = await prisma.product.update({
      where: { id },
      data: {
        name,
        image,
        price,
        isActive,
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
