import { prisma } from '../../../../prisma/prisma.js'

export class DeleteTransactionRepository {
    async execute(transactionId) {
        try {
            return await prisma.transaction.delete({
                where: {
                    id: transactionId,
                },
            })
        } catch (error) {
            return null
        }
    }
}
