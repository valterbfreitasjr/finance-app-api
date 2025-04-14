import { faker } from '@faker-js/faker'
import { prisma } from '../../../../prisma/prisma.js'
import { userData as fakeUser } from '../../../tests'
import { UpdateUserRepository } from './update-user'

describe('Update User Repository', () => {
    const makeSut = () => {
        const sut = new UpdateUserRepository()

        return { sut }
    }

    it('should update user on db', async () => {
        // arrange
        const createdUser = await prisma.user.create({
            data: fakeUser,
        })

        const sut = makeSut()

        const updatedUser = {
            ...createdUser,
            first_name: faker.person.firstName,
            last_name: faker.person.lastName,
        }

        // act
        const result = await sut.execute(createdUser.id, updatedUser)

        // assert
        expect(result).toStrictEqual(updatedUser)
    })
})
