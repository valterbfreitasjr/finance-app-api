import { faker } from '@faker-js/faker'
import { userData as fakeUser } from '../../../tests'
import { prisma } from './../../../../prisma/prisma.js'
import { GetUserBalanceRepository } from './get-user-balance.js'
import { TransactionType } from '@prisma/client'

describe('Get User Balance Repository', () => {
    const makeSut = () => {
        const sut = new GetUserBalanceRepository()

        return { sut }
    }

    it('should get user balance on db', async () => {
        // arrange
        const createdUser = await prisma.user.create({
            data: fakeUser,
        })

        await prisma.transaction.createMany({
            data: [
                {
                    name: faker.string.sample(),
                    date: faker.date.recent(),
                    amount: 5000,
                    type: 'EARNING',
                    user_id: createdUser.id,
                },
                {
                    name: faker.string.sample(),
                    date: faker.date.recent(),
                    amount: 3000,
                    type: 'EARNING',
                    user_id: createdUser.id,
                },
                {
                    name: faker.string.sample(),
                    date: faker.date.recent(),
                    amount: 1000,
                    type: 'EXPENSE',
                    user_id: createdUser.id,
                },
                {
                    name: faker.string.sample(),
                    date: faker.date.recent(),
                    amount: 500,
                    type: 'EXPENSE',
                    user_id: createdUser.id,
                },
                {
                    name: faker.string.sample(),
                    date: faker.date.recent(),
                    amount: 2000,
                    type: 'INVESTMENT',
                    user_id: createdUser.id,
                },
                {
                    name: faker.string.sample(),
                    date: faker.date.recent(),
                    amount: 1000,
                    type: 'INVESTMENT',
                    user_id: createdUser.id,
                },
            ],
        })

        const { sut } = makeSut()

        // act
        const result = await sut.execute(createdUser.id)

        // assert
        expect(result.earnings.toString()).toBe('8000')
        expect(result.expenses.toString()).toBe('1500')
        expect(result.investments.toString()).toBe('3000')
        expect(result.balance.toString()).toBe('3500')
    })

    it('should call Prisma with correct params', async () => {
        // arrange
        const { sut } = makeSut()
        const prismaSpy = jest.spyOn(prisma.transaction, 'aggregate')

        // act
        await sut.execute(fakeUser.id)

        // assert
        expect(prismaSpy).toHaveBeenCalledTimes(3)
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: fakeUser.id,
                type: TransactionType.EXPENSE,
            },
            _sum: {
                amount: true,
            },
        })
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: fakeUser.id,
                type: TransactionType.EARNING,
            },
            _sum: {
                amount: true,
            },
        })
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: fakeUser.id,
                type: TransactionType.INVESTMENT,
            },
            _sum: {
                amount: true,
            },
        })
    })
})
