import { prisma } from '../../../../prisma/prisma'
import { DeleteTransactionRepository } from './delete-transaction'
import { userData as fakeUser } from '../../../tests/fixtures/user.js'
import { transaction } from '../../../tests/fixtures/transaction.js'
import dayjs from 'dayjs'

describe('Delete Transaction Repository', () => {
    const makeSut = () => {
        const sut = new DeleteTransactionRepository()

        return { sut }
    }

    it('should delete transaction on db', async () => {
        // arrange
        const createdUser = await prisma.user.create({
            data: fakeUser,
        })

        const createdTransaction = await prisma.transaction.create({
            ...transaction,
            user_id: createdUser.id,
        })

        const sut = makeSut()

        // act
        const result = await sut.execute(createdTransaction.id)

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

    it('should call Prisma with correct params', async () => {
        // arrange
        const { sut } = makeSut()
        const prismaSpy = jest.spyOn(prisma.transaction, 'delete')

        // act
        await sut.execute(transaction.id)

        // assert
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: transaction.id,
            },
        })
    })
})
