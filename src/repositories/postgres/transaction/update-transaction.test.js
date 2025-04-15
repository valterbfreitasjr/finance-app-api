import { faker } from '@faker-js/faker'
import { prisma } from '../../../../prisma/prisma'
import { transaction } from '../../../tests/fixtures/transaction.js'
import { UpdateTransactionRepository } from './update-transaction'
import dayjs from 'dayjs'

describe('', () => {
    const makeSut = () => {
        const sut = new UpdateTransactionRepository()

        return { sut }
    }

    it('should update transaction on db', async () => {
        // arrange
        const createdTransaction = await prisma.transaction.create({
            data: transaction,
        })

        const { sut } = makeSut()

        const updatedTransaction = {
            user_id: createdTransaction.user_id,
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            type: 'EXPENSE',
            amount: Number(faker.finance.amount()),
        }

        // act
        const result = await sut.execute({
            ...updatedTransaction,
            id: createdTransaction.id,
        })

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
})
