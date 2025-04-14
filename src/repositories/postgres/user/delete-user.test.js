import { DeleteUserRepository } from './delete-user'
import { prisma } from './../../../../prisma/prisma.js'
import { userData as fakeUser } from '../../../tests'

describe('Delete User Repository', () => {
    const makeSut = () => {
        const sut = new DeleteUserRepository()

        return { sut }
    }

    it('should delete a user on db', async () => {
        // arrange
        await prisma.user.create({
            data: fakeUser,
        })

        const { sut } = makeSut()

        // act
        const result = await sut.execute(fakeUser.id)

        // assert
        expect(result).toStrictEqual(fakeUser)
    })

    it('should call Prisma with correct params', async () => {
        // arrange
        const { sut } = makeSut()
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
})
