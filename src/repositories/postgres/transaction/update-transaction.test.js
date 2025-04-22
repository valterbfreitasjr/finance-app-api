import { faker } from '@faker-js/faker'
import { prisma } from '../../../../prisma/prisma'
import { transaction } from '../../../tests/fixtures/transaction.js'
import { userData as fakeUser } from '../../../tests/fixtures/user.js'
import { UpdateTransactionRepository } from './update-transaction'
import dayjs from 'dayjs'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { TransactionNotFoundError } from '../../../errors/transaction.js'

describe('Update Transaction Repository', () => {
    it('should update transaction on db', async () => {
        // arrange
        await prisma.user.create({ data: fakeUser })
        await prisma.transaction.create({
            data: {
                ...transaction,
                user_id: fakeUser.id,
            },
        })

        const sut = new UpdateTransactionRepository()

        const updatedTransaction = {
            id: faker.string.uuid(),
            user_id: fakeUser.id,
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            type: 'EXPENSE',
            amount: Number(faker.finance.amount()),
        }

        // act
        const result = await sut.execute(transaction.id, updatedTransaction)

        // assert
        expect(result.name).toBe(updatedTransaction.name)
        expect(result.type).toBe(updatedTransaction.type)
        expect(result.user_id).toBe(updatedTransaction.id)
        expect(String(result.amount)).toBe(String(updatedTransaction.amount))

        expect(dayjs(result.date).daysInMonth()).toBe(
            dayjs(updatedTransaction.date).daysInMonth,
        )

        expect(dayjs(result.date).month).toBe(
            dayjs(updatedTransaction.date).month,
        )

        expect(dayjs(result.date).year).toBe(
            dayjs(updatedTransaction.date).year,
        )
    })

    it('should call Prisma with correct params', async () => {
        // arrange
        await prisma.user.create({ data: fakeUser })
        await prisma.transaction.create({
            data: {
                ...transaction,
                user_id: fakeUser.id,
            },
        })
        const sut = new UpdateTransactionRepository()
        const prismaSpy = jest.spyOn(prisma.transaction, 'update')

        // act
        await sut.execute(transaction.id, {
            ...transaction,
            user_id: fakeUser.id,
        })

        // assert
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: transaction.id,
            },
            data: { ...transaction, user_id: fakeUser.id },
        })
    })

    it('should throw if Prisma throws', async () => {
        const sut = new UpdateTransactionRepository()
        jest.spyOn(prisma.transaction, 'update').mockRejectedValueOnce(
            new Error(),
        )

        const promise = sut.execute(transaction.id, transaction)

        await expect(promise).rejects.toThrow()
    })

    it('should throw TransactionNotFoundError if Prisma does not find record to update', async () => {
        const sut = new UpdateTransactionRepository()
        jest.spyOn(prisma.transaction, 'update').mockRejectedValueOnce(
            new PrismaClientKnownRequestError('', {
                code: 'P2025',
            }),
        )

        const promise = sut.execute(transaction.id, transaction)

        await expect(promise).rejects.toThrow(
            new TransactionNotFoundError(transaction.id),
        )
    })
})
