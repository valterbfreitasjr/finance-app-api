import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const totalExpenses = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EXPENSE',
            },
            _sum: {
                amount: true,
            },
        })

        const totalInvestments = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'INVESTMENT',
            },
            _sum: {
                amount: true,
            },
        })

        const totalEarnings = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EARNING',
            },
            _sum: {
                amount: true,
            },
        })

        const balance =
            totalEarnings._sum.amount -
            totalExpenses._sum.amount -
            totalInvestments._sum.amount

        console.log(balance)

        return {
            balance,
            totalEarnings,
            totalExpenses,
            totalInvestments,
        }
    }
}
