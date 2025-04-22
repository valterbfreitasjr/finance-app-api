import dayjs from 'dayjs'
import { prisma } from '../../../../prisma/prisma'
import { transaction } from '../../../tests/fixtures/transaction.js'
import { userData as fakeUser } from '../../../tests/fixtures/user.js'
import { DeleteTransactionRepository } from './delete-transaction'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { TransactionNotFoundError } from '../../../errors'

describe('DeleteTransactionRepository', () => {
    it('should delete a transaction on db', async () => {
        await prisma.user.create({ data: fakeUser })
        await prisma.transaction.create({
            data: { ...transaction, user_id: fakeUser.id },
        })
        const sut = new DeleteTransactionRepository()

        const result = await sut.execute(transaction.id)

        expect(result.name).toBe(transaction.name)
        expect(result.type).toBe(transaction.type)
        expect(result.user_id).toBe(fakeUser.id)
        expect(String(result.amount)).toBe(String(transaction.amount))
        expect(dayjs(result.date).daysInMonth()).toBe(
            dayjs(transaction.date).daysInMonth(),
        )
        expect(dayjs(result.date).month()).toBe(dayjs(transaction.date).month())
        expect(dayjs(result.date).year()).toBe(dayjs(transaction.date).year())
    })

    it('should call Prisma with correct params', async () => {
        await prisma.user.create({ data: fakeUser })
        await prisma.transaction.create({
            data: { ...transaction, user_id: fakeUser.id },
        })
        const prismaSpy = jest.spyOn(prisma.transaction, 'delete')
        const sut = new DeleteTransactionRepository()

        await sut.execute(transaction.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: transaction.id,
            },
        })
    })

    it('should throw generic error if Prisma throws generic error', async () => {
        const sut = new DeleteTransactionRepository()
        jest.spyOn(prisma.transaction, 'delete').mockRejectedValueOnce(
            new Error(),
        )

        const promise = sut.execute(transaction.id)

        await expect(promise).rejects.toThrow()
    })

    it('should throw generic error if Prisma throws generic error', async () => {
        const sut = new DeleteTransactionRepository()
        jest.spyOn(prisma.transaction, 'delete').mockRejectedValueOnce(
            new PrismaClientKnownRequestError('', {
                code: 'P2025',
            }),
        )

        const promise = sut.execute(transaction.id)

        await expect(promise).rejects.toThrow(
            new TransactionNotFoundError(transaction.id),
        )
    })
})
