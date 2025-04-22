import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js'
import { prisma } from '../../../../prisma/prisma.js'
import { UserNotFoundError } from '../../../errors/user.js'

export class DeleteUserRepository {
    async execute(userId) {
        try {
            return await prisma.user.delete({
                where: {
                    id: userId,
                },
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // An operation failed because it depends on one or more records that were required but not found. - Prisma Docs
                if (error.code === 'P2025') {
                    throw new UserNotFoundError(userId)
                }
            }
            throw error
        }
    }
}
