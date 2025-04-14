import { prisma } from '../../../../prisma/prisma.js'
import { userData as fakeUser } from '../../../tests'
import { GetUserByIdRepository } from './get-user-by-id'

describe('Get User By Id Repository', () => {
    const makeSut = () => {
        const sut = new GetUserByIdRepository()

        return { sut }
    }

    it('should get user by id on db', async () => {
        // arrange
        const createdUser = await prisma.user.create({
            data: fakeUser,
        })

        const { sut } = makeSut()

        // act
        const result = sut.execute(createdUser.id)

        // assert
        expect(result).toStrictEqual(createdUser)
    })

    it('should call Prisma with correct params', async () => {
        // arrange
        const sut = makeSut()
        const prismaSpy = jest.spyOn(prisma.user, 'findUnique')

        // act
        await sut.execute(fakeUser.id)

        // assert
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: fakeUser.id,
            },
        })
    })
})
