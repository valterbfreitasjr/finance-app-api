import { GetTransactionByUserIdRepository } from './get-transaction-by-user-id'
import { userData as fakeUser } from '../../../tests/fixtures/user.js'
import { prisma } from '../../../../prisma/prisma'
import { transaction } from '../../../tests/fixtures/transaction'
import dayjs from 'dayjs'

describe('Get Transaction By User Id', () => {
    it('should get transaction by user id on db', async () => {
        // arrange
        const createdUser = await prisma.user.create({
            data: fakeUser,
        })

        await prisma.transaction.create({
            data: {
                ...transaction,
                user_id: createdUser.id,
            },
        })

        const sut = new GetTransactionByUserIdRepository()

        // act
        const result = await sut.execute(createdUser.id)

        // assert
        expect(result.length).toBe(1)
        expect(result[0].name).toBe(createdUser.name)
        expect(result[0].type).toBe(createdUser.type)
        expect(result[0].user_id).toBe(createdUser.id)

        expect(String(result[0].amount)).toBe(String(transaction.amount))

        expect(dayjs(result[0].date).daysInMonth()).toBe(
            dayjs(transaction.date).daysInMonth,
        )

        expect(dayjs(result[0].date).month).toBe(dayjs(transaction.date).month)

        expect(dayjs(result[0].date).year).toBe(dayjs(transaction.date).year)
    })

    it('should call Prisma with corrects params', async () => {
        // arrange
        const sut = new GetTransactionByUserIdRepository()
        const prismaSpy = jest.spyOn(prisma.transaction, 'findMany')

        // act
        await sut.execute(fakeUser.id)

        // assert
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: fakeUser.id,
            },
        })
    })

    it('should throw an error if Prisma throws', async () => {
        // arrange
        const sut = new GetTransactionByUserIdRepository()
        jest.spyOn(prisma.transaction, 'findMany').mockRejectedValueOnce(
            new Error(),
        )

        // act
        const result = sut.execute(fakeUser.id)

        // assert
        expect(result).rejects.toThrow()
    })
})
