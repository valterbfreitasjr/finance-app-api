import { DeleteUserRepository } from './delete-user'
import { prisma } from './../../../../prisma/prisma.js'
import { userData as fakeUser } from '../../../tests'
import { UserNotFoundError } from '../../../errors/user.js'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

describe('Delete User Repository', () => {
    const makeSut = () => {
        const sut = new DeleteUserRepository()

        return { sut }
    }

    it('should delete a user on db', async () => {
        // arrange
        const createdUser = await prisma.user.create({
            data: fakeUser,
        })

        const { sut } = makeSut()

        // act
        const result = await sut.execute(createdUser.id)

        // assert
        expect(result).toStrictEqual(createdUser)
    })

    it('should call Prisma with correct params', async () => {
        // arrange
        const createdUser = await prisma.user.create({
            data: fakeUser,
        })
        const { sut } = makeSut()
        const prismaSpy = jest.spyOn(prisma.user, 'delete')

        // act
        await sut.execute(createdUser.id)

        // assert
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: createdUser.id,
            },
        })
    })

    it('should throw generic error if Prisma throws generic error', async () => {
        // arrange
        const { sut } = makeSut()
        jest.spyOn(prisma.user, 'delete').mockRejectedValueOnce(new Error())

        // act
        const result = sut.execute(fakeUser.id)

        // assert
        expect(result).rejects.toThrow()
    })

    it('should throw generic error if Prisma throws generic error', async () => {
        // arrange
        const { sut } = makeSut()
        jest.spyOn(prisma.user, 'delete').mockRejectedValueOnce(
            new PrismaClientKnownRequestError('', {
                code: 'P2025',
            }),
        )

        // act
        const result = sut.execute(fakeUser.id)

        // assert
        expect(result).rejects.toThrow(new UserNotFoundError(fakeUser.id))
    })
})
