import { faker } from '@faker-js/faker'
import { PasswordHasherAdapter } from './password-hasher'

describe('Password Hasher Adapter', () => {
    const makeSut = () => {
        const sut = new PasswordHasherAdapter()

        return { sut }
    }

    it('should return a hashed passwrd', async () => {
        // arrange
        const { sut } = makeSut()
        const password = faker.internet.password()

        // act
        const result = await sut.execute(password)

        // assert
        expect(result).toBeTruthy()
        expect(typeof result).toBe('string')
        expect(result).not.toBe(password)
    })
})
