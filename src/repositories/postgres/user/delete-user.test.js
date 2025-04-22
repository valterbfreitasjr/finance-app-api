import { DeleteUserRepository } from './delete-user'
import { prisma } from './../../../../prisma/prisma.js'
import { userData as fakeUser } from '../../../tests'
import { UserNotFoundError } from '../../../errors/user.js'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

describe('Delete User Repository', () => {
    it('should delete a user on db', async () => {
        // arrange
        await prisma.user.create({
            data: fakeUser,
        })

        const sut = new DeleteUserRepository()

        // act
        const result = await sut.execute(fakeUser.id)

        // assert
        expect(result).toStrictEqual(fakeUser)
    })

    it('should call Prisma with correct params', async () => {
        // arrange
        await prisma.user.create({
            data: fakeUser,
        })
        const sut = new DeleteUserRepository()
        const prismaSpy = jest.spyOn(prisma.user, 'delete')

        // act
        await sut.execute(fakeUser.id)

        // assert
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: fakeUser.id,
            },
        })
    })

    it('should throw generic error if Prisma throws generic error', async () => {
        // arrange
        const sut = new DeleteUserRepository()
        jest.spyOn(prisma.user, 'delete').mockRejectedValueOnce(new Error())

        // act
        const result = sut.execute(fakeUser.id)

        // assert
        expect(result).rejects.toThrow()
    })

    it('should throw generic error if Prisma throws generic error', async () => {
        // arrange
        const sut = new DeleteUserRepository()
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
