import { IContext } from '../../../interfaces'
import { PrismaClient } from '@prisma/client'

interface ResolverContext extends IContext {
  prisma: PrismaClient
}

export const experienceResolver = {
  Query: {
    experience: async (_: any, { id }: { id: string }, { prisma }: ResolverContext) => {
      try {
        const experience = await prisma.experience.findUnique({
          where: { id },
        })
        
        if (!experience) {
          return null
        }

        return experience
      } catch (error) {
        console.error('Error fetching experience:', error)
        return null
      }
    }
  }
}
