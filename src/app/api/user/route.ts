import { isEmail, isPhoneNumber, isRequired } from "@/utils/function";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const skip = parseInt(url.searchParams.get("skip") || "0");
    const take = parseInt(url.searchParams.get("take") || "0");
    const takeQuery = take ? { take: take } : null;

    const users = await prisma.user.findMany({
      skip,
      ...takeQuery,
      where: { deleted: false },
    });
    return NextResponse.json(
      { code: 200, message: "Read data users success", data: users },
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
    const { name, email, phone, role, password } = body;

    isRequired(body, "name");
    isEmail(email);
    isPhoneNumber(phone);
    isRequired(body, "role");

    const hashedPassword = await bcrypt.hash(password, 10);
    const ress = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        role,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { code: 200, message: "Create data user success", data: ress },
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
    const { name, email, phone, role, password, id } = body;

    isRequired(body, "id");
    isRequired(body, "name");
    isEmail(email);
    isPhoneNumber(phone);
    isRequired(body, "role");

    const hashedPassword = await bcrypt.hash(password, 10);
    const ress = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        role,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { code: 200, message: "Update data user success", data: ress },
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

    const ress = await prisma.user.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
    return NextResponse.json(
      { code: 200, message: "Delete data user success", data: ress },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { code: 409, message: error?.message, data: [] },
      { status: 409 }
    );
  }
}
