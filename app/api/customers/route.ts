import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  console.log("DATABASE_URL =", process.env.DATABASE_URL);

  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  console.log("customers.length =", customers.length);
  if (customers[0]) console.log("first =", customers[0]);

  return NextResponse.json(customers);
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = body.name?.trim();

  if (!name) {
    return NextResponse.json({ error: "名前は必須です" }, { status: 400 });
  }

const customer = await prisma.customer.create({
  data: {
    name,
    createdAt: new Date(),
  },
});

  return NextResponse.json(customer, { status: 201 });
}
