import { prisma } from '../../../../prisma/prisma.js'

export class GetTransactionByUserIdRepository {
    async execute(userId) {
        console.log(userId)
        return await prisma.transaction.findMany({
            where: {
                user_id: userId,
            },
        })
    }
}
