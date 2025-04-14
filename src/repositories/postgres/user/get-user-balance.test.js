import { faker } from '@faker-js/faker'
import { userData } from '../../../tests'
import { prisma } from './../../../../prisma/prisma.js'
import { GetUserBalanceRepository } from './get-user-balance.js'

describe('Get User Balance Repository', () => {
    const makeSut = () => {
        const sut = new GetUserBalanceRepository()

        return { sut }
    }

    it('should get user balance on db', async () => {
        // arrange
        const createdUser = await prisma.user.create({
            data: userData,
        })

        await prisma.transaction.create({
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

        const { sut } = new makeSut()

        // act
        const result = await sut.execute(createdUser.id)

        // assert
        expect(result.earnings.toString()).toBe('8000')
        expect(result.expenses.toString()).toBe('1500')
        expect(result.investments.toString()).toBe('3000')
        expect(result.balance.toString()).toBe('3500')
    })
})
