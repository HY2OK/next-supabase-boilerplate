'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

const addTodo = async (formData: FormData) => {
  const title = formData.get('title') as string | null

  try {
    if (title) {
      await prisma.todo.create({
        data: {
          title,
        },
      })
      revalidatePath('/')
    }
  } catch (error) {
    console.error(error)
  }
}

export default addTodo
