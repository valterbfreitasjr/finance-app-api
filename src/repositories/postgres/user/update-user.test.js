import { faker } from '@faker-js/faker'
import { prisma } from '../../../../prisma/prisma.js'
import { userData as fakeUser } from '../../../tests'
import { UpdateUserRepository } from './update-user'

describe('Update User Repository', () => {
    const makeSut = () => {
        const sut = new UpdateUserRepository()

        return { sut }
    }

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
        const sut = makeSut()

        // act
        const result = await sut.execute(createdUser.id, updatedUser)

        // assert
        expect(result).toStrictEqual(updatedUser)
    })

    it('should call Prisma with correct params', async () => {
        // arrange
        const { sut } = makeSut()
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
})
