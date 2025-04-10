import { prisma } from '../../../../prisma/prisma.js'

export class GetTransactionByIdRepository {
    async execute(transactionId) {
        return await prisma.transaction.findUnique({
            where: {
                id: transactionId,
            },
        })
    }
}
