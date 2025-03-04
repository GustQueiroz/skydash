import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { name, email, phone, cpf, password } = await req.json()

    // Verificar se o email já existe
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return NextResponse.json({ message: "Email já está em uso" }, { status: 409 })
    }

    // Verificar se o CPF já existe
    const existingCpf = await db.user.findFirst({
      where: {
        cpf,
      },
    })

    if (existingCpf) {
      return NextResponse.json({ message: "CPF já está em uso" }, { status: 409 })
    }

    const hashedPassword = await hash(password, 10)

    const user = await db.user.create({
      data: {
        name,
        email,
        phone,
        cpf,
        password: hashedPassword,
        role: "FUNCIONARIO", // Por padrão, novos usuários são funcionários
      },
    })

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Erro ao criar usuário" }, { status: 500 })
  }
}

