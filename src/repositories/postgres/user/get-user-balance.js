import { TransactionType } from '@prisma/client'
import { prisma } from '../../../../prisma/prisma.js'

export class GetUserBalanceRepository {
    async execute(userId) {
        const totalExpenses = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: TransactionType.EXPENSE,
            },
            _sum: {
                amount: true,
            },
        })

        const totalInvestments = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: TransactionType.INVESTMENT,
            },
            _sum: {
                amount: true,
            },
        })

        const totalEarnings = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: TransactionType.EARNING,
            },
            _sum: {
                amount: true,
            },
        })

        const balance =
            totalEarnings._sum.amount -
            totalExpenses._sum.amount -
            totalInvestments._sum.amount

        return {
            balance,
            totalEarnings,
            totalExpenses,
            totalInvestments,
        }
    }
}
