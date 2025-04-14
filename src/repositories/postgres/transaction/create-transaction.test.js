import { prisma } from '../../../../prisma/prisma'
import { transaction } from '../../../tests/fixtures/transaction.js'
import { userData as fakeUser } from '../../../tests/fixtures/user,js'
import { CreateTransactionRepository } from './create-transaction'
import dayjs from 'dayjs'

describe('Create Transaction Repository', () => {
    const makeSut = () => {
        const sut = new CreateTransactionRepository()

        return { sut }
    }

    it('should create a transaction on db', async () => {
        // arrange
        const createdUser = await prisma.user.create({
            data: fakeUser,
        })

        const { sut } = makeSut()

        // act
        const result = await sut.execute(transaction)

        // assert
        expect(result.name).toBe(createdUser.name)
        expect(result.type).toBe(createdUser.type)
        expect(result.user_id).toBe(createdUser.id)

        expect(String(result.amount)).toBe(String(transaction.amount))

        expect(dayjs(result.date).daysInMonth()).toBe(
            dayjs(transaction.date).daysInMonth,
        )

        expect(dayjs(result.date).month).toBe(dayjs(transaction.date).month)

        expect(dayjs(result.date).year).toBe(dayjs(transaction.date).year)
    })
})
