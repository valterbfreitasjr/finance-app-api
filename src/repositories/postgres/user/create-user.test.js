import { userData as fakeUser } from '../../../tests/fixtures/user'
import { CreateUserRepository } from './create-user'
import { prisma } from './../../../../prisma/prisma.js'

describe('Create User Repository', () => {
    it('should create a user on db successfully', async () => {
        // arrange
        const sut = new CreateUserRepository()

        // act
        const result = await sut.execute(fakeUser)

        // assert
        expect(result.id).toBe(fakeUser.id)
        expect(result.first_name).toBe(fakeUser.first_name)
        expect(result.last_name).toBe(fakeUser.last_name)
        expect(result.email).toBe(fakeUser.email)
        expect(result.password).toBe(fakeUser.password)
    })

    it('should call Prisma with correct params', async () => {
        // arrange
        const sut = new CreateUserRepository()
        const prismaSpy = jest.spyOn(prisma.user, 'create')

        // act
        await sut.execute(fakeUser)

        // assert
        expect(prismaSpy).toHaveBeenCalledWith({
            data: fakeUser,
        })
    })

    it('should CreateUserRepository throws if Prisma throws', async () => {
        // arrange
        const sut = new CreateUserRepository()
        jest.spyOn(prisma.user, 'create').mockRejectedValueOnce(new Error())

        // act
        const result = sut.execute(fakeUser)

        // assert
        expect(result).rejects.toThrow()
    })
})
