import { faker } from '@faker-js/faker'
import { prisma } from '../../../../prisma/prisma.js'
import { userData as fakeUser } from '../../../tests'
import { UpdateUserRepository } from './update-user'
import { UserNotFoundError } from '../../../errors/user.js'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

describe('Update User Repository', () => {
    const createdUser = async () => {
        return await prisma.user.create({
            data: fakeUser,
        })
    }

    const updatedUser = {
        ...createdUser,
        first_name: faker.person.firstName,
        last_name: faker.person.lastName,
    }

    it('should update user on db', async () => {
        // arrange
        const sut = new UpdateUserRepository()

        // act
        const result = await sut.execute(createdUser.id, updatedUser)

        // assert
        expect(result).toStrictEqual(updatedUser)
    })

    it('should call Prisma with correct params', async () => {
        // arrange
        const sut = new UpdateUserRepository()
        const prismaSpy = jest.spyOn(prisma.user, 'update')

        // act
        await sut.execute(createdUser.id, updatedUser)

        // assert
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: createdUser.id,
            },
            data: updatedUser,
        })
    })

    it('should UpdateUserRepository throws if Prisma throws', async () => {
        // arrange
        const sut = new UpdateUserRepository()
        jest.spyOn(prisma.user, 'update').mockRejectedValueOnce(new Error())

        // act
        const result = sut.execute(updatedUser.id)

        // assert
        expect(result).rejects.toThrow()
    })

    it('should throw UserNotFoundError if user is not found to update', async () => {
        // arrange
        const sut = new UpdateUserRepository()
        jest.spyOn(prisma.user, 'update').mockRejectedValueOnce(
            new PrismaClientKnownRequestError('', {
                code: 'P2025',
            }),
        )

        // act
        const result = sut.execute(updatedUser.id)

        // assert
        expect(result).rejects.toThrow(new UserNotFoundError(updatedUser.id))
    })
})
