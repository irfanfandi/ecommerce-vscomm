import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const products = await prisma.product.count();

    const productsActive = await prisma.product.count({
      where: { isActive: true },
    });
    const users = await prisma.user.count();

    const usersActive = await prisma.user.count({
      where: { deleted: false },
    });

    return NextResponse.json(
      {
        code: 200,
        message: "Read data dashboard success",
        data: {
          products_active: productsActive,
          all_products: products,
          all_users: users,
          users_active: usersActive,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { code: 409, message: error, data: [] },
      { status: 409 }
    );
  }
}
