import { CreateUserController } from './create-user'

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }

    it('should create an user', async () => {
        //arrange
        const createUserController = new CreateUserController(
            new CreateUserUseCaseStub(),
        )

        //act
        const httpRequest = {
            body: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
            },
        }

        const result = await createUserController.execute(httpRequest)

        //assert
        expect(result.statusCode).toEqual(201)
        expect(result.body).not.toBeUndefined()
        expect(result.body).not.toBeNull()
    })
})
