import { CreateUserController } from '../../controllers/create-user.js'
import { DeleteUserController } from '../../controllers/delete-user.js'
import { GetUserByIdController } from '../../controllers/get-user-by-id.js'
import { UpdateUserController } from '../../controllers/update-user.js'
import { PostgresCreateUserRepository } from '../../repositories/postgres/create-user.js'
import { PostgresDeleteUserRepository } from '../../repositories/postgres/delete-user.js'
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres/get-user-by-email.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/get-user-by-id.js'
import { PostgresUpdateUserRepository } from '../../repositories/postgres/update-user.js'
import { CreateUserUseCase } from '../../use-cases/create-user.js'
import { DeleteUserUseCase } from '../../use-cases/delete-user.js'
import { GetUserByIdUseCase } from '../../use-cases/get-user-by-id.js'
import { UpdateUserUseCase } from '../../use-cases/update-user.js'

export const makeCreateUserController = () => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository()
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()

    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    )

    const createUserController = new CreateUserController(createUserUseCase)

    return createUserController
}

export const makeGetUserByIdController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository,
    )

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
}

export const makeUpdateUserController = () => {
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

    const updateUserUseCase = new UpdateUserUseCase(
        postgresUpdateUserRepository,
    )

    const updateUserController = new UpdateUserController(updateUserUseCase)

    return updateUserController
}

export const makeDeleteUserController = () => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    )

    const deleteUserController = new DeleteUserController(deleteUserUseCase)

    return deleteUserController
}
