import { prisma } from '../../../../prisma/prisma.js'
import { userData as fakeUser } from '../../../tests'
import { GetUserByIdRepository } from './get-user-by-id'

describe('Get User By Id Repository', () => {
    it('should get user by id on db', async () => {
        // arrange
        await prisma.user.create({
            data: fakeUser,
        })

        const sut = new GetUserByIdRepository()

        // act
        const result = sut.execute(fakeUser.id)

        // assert
        expect(result).toStrictEqual(fakeUser)
    })

    it('should call Prisma with correct params', async () => {
        // arrange
        const sut = new GetUserByIdRepository()
        const prismaSpy = jest.spyOn(prisma.user, 'findUnique')

        await prisma.user.create({
            data: fakeUser,
        })

        // act
        await sut.execute(fakeUser.id)

        // assert
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: fakeUser.id,
            },
        })
    })

    it('should GetUserByIdRepository throws if Prisma throws', async () => {
        // arrange
        const sut = new GetUserByIdRepository()
        jest.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce(new Error())

        // act
        const result = sut.execute(fakeUser.id)

        // assert
        expect(result).rejects.toThrow()
    })
})
