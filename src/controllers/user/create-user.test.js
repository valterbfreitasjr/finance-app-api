import { CreateUserController } from './create-user'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    it('should create an user', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        //act
        const httpRequest = {
            body: {
                first_name: 'Valter',
                last_name: 'Jr',
                email: 'v@email.com',
                password: '123456',
            },
        }

        const result = await createUserController.execute(httpRequest)

        //assert
        expect(result.statusCode).toEqual(201)
        expect(result.body).not.toBeUndefined()
        expect(result.body).not.toBeNull()
    })
})
