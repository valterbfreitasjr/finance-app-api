import { CreateUserController } from './create-user'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    // Create User
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

    // Ensure first_name
    it('should return 400 if first_name is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        //act
        const httpRequest = {
            body: {
                last_name: 'Jr',
                email: 'v@email.com',
                password: '123456',
            },
        }

        const result = await createUserController.execute(httpRequest)

        //assert
        expect(result.statusCode).toEqual(400)
    })

    // Ensure last_name
    it('should return 400 if last_name is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        //act
        const httpRequest = {
            body: {
                first_name: 'Valter',
                email: 'v@email.com',
                password: '123456',
            },
        }

        const result = await createUserController.execute(httpRequest)

        //assert
        expect(result.statusCode).toEqual(400)
    })
})
