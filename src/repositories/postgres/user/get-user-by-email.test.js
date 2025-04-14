import { prisma } from '../../../../prisma/prisma.js'
import { userData as fakeUser } from '../../../tests'
import { GetUserByEmailRepository } from './get-user-by-email'

describe('Get User By Email Repository', async () => {
    const makeSut = () => {
        const sut = new GetUserByEmailRepository()

        return { sut }
    }

    it('should returns user by email', async () => {
        // arrange
        const createdUser = await prisma.user.create({
            data: fakeUser,
        })

        const { sut } = makeSut()

        // act
        const result = sut.execute(createdUser.email)

        // assert
        expect(result).toStrictEqual(createdUser)
    })

    it('should call Prisma with correct params', async () => {
        // arrange
        const { sut } = makeSut()
        const prismaSpy = jest.spyOn(prisma.user, 'findUnique')

        // act
        sut.execute(fakeUser.email)

        // assert
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                email: fakeUser.email,
            },
        })
    })

    it('should GetUserByEmailRepository throws if Prisma throws', async () => {
        // arrange
        const { sut } = makeSut()
        jest.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce(new Error())

        // act
        const result = sut.execute(fakeUser.id)

        // assert
        expect(result).rejects.toThrow()
    })
})
