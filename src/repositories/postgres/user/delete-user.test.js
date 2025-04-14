import { DeleteUserRepository } from './delete-user'
import { prisma } from './../../../../prisma/prisma.js'
import { userData } from '../../../tests'

describe('Delete User Repository', () => {
    const makeSut = () => {
        const sut = new DeleteUserRepository()

        return { sut }
    }

    it('should delete a user on db', async () => {
        // arrange
        await prisma.user.create({
            data: userData,
        })

        const { sut } = new makeSut()

        // act
        const result = await sut.execute(userData.id)

        // assert
        expect(result).toStrictEqual(userData)
    })
})
