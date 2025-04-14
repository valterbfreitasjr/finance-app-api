import { userData } from '../../../tests/fixtures/user'
import { CreateUserRepository } from './create-user'
import { prisma } from './../../../../prisma/prisma.js'

describe('Create User Repository', () => {
    const makeSut = () => {
        const sut = new CreateUserRepository()

        return { sut }
    }

    it('should create a user on db successfully', async () => {
        // arrange
        const { sut } = new makeSut()

        // act
        const result = await sut.execute(userData)

        // assert
        expect(result.id).toBe(userData.id)
        expect(result.first_name).toBe(userData.first_name)
        expect(result.last_name).toBe(userData.last_name)
        expect(result.email).toBe(userData.email)
        expect(result.password).toBe(userData.password)
    })

    it('should call Prisma with correct params', async () => {
        // arrange
        const { sut } = makeSut()
        const prismaSpy = jest.spyOn(prisma.user, 'create')

        // act
        await sut.execute(userData)

        // assert
        expect(prismaSpy).toHaveBeenCalledWith({
            data: userData,
        })
    })
})
