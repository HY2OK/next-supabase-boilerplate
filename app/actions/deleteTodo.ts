'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

const deleteTodo = async (formData: FormData) => {
  const id = parseInt(formData.get('id') as string)

  try {
    if (id) {
      await prisma.todo.delete({
        where: { id },
      })
      revalidatePath('/')
    }
  } catch (error) {
    console.error(error)
  }
}

export default deleteTodo
