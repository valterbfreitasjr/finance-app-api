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

    // Ensure email
    it('should return 400 if email is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: 'Valter',
                last_name: 'Jr',
                password: '123456',
            },
        }

        //act
        const result = await createUserController.execute(httpRequest)

        //assert
        expect(result.statusCode).toEqual(400)
    })

    // Ensure if email is not valid
    it('should return 400 if email is not valid', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)
        const httpRequest = {
            body: {
                first_name: 'Valter',
                last_name: 'Jr',
                email: 'xxr',
                password: '123456',
            },
        }

        //act
        const result = await createUserController.execute(httpRequest)

        //assert
        expect(result.statusCode).toEqual(400)
    })

    // Ensure password
    it('should return 400 if password is not provided', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        //act
        const httpRequest = {
            body: {
                first_name: 'Valter',
                last_name: 'Jr',
                email: 'v@email.com',
            },
        }

        const result = await createUserController.execute(httpRequest)

        //assert
        expect(result.statusCode).toEqual(400)
    })

    // Ensure password length
    it('should return 400 if password length is less than 6 characters', async () => {
        //arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        //act
        const httpRequest = {
            body: {
                first_name: 'Valter',
                last_name: 'Jr',
                email: 'v@email.com',
                password: '12345',
            },
        }

        const result = await createUserController.execute(httpRequest)

        //assert
        expect(result.statusCode).toEqual(400)
    })
})
