import { prisma } from '../../../../prisma/prisma.js'

export class CreateTransactionRepository {
    async execute(createTransactionParams) {
        return await prisma.transaction.create({
            data: createTransactionParams,
        })
    }
}
