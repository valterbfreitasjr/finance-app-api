import {
    CreateUserController,
    DeleteUserController,
    GetUserBalanceController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers/index.js'

import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserBalanceRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js'

import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserBalanceUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from '../../use-cases/index.js'

import {
    PasswordHasherAdapter,
    IdGeneratorAdapter,
} from '../../adapters/index.js'

export const makeCreateUserController = () => {
    const passwordHasherAdapter = new PasswordHasherAdapter()
    const idGeneratorAdapter = new IdGeneratorAdapter()

    const postgresCreateUserRepository = new PostgresCreateUserRepository()

    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()

    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
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
    const passwordHasherAdapter = new PasswordHasherAdapter()

    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()

    const updateUserUseCase = new UpdateUserUseCase(
        postgresUpdateUserRepository,
        postgresGetUserByEmailRepository,
        passwordHasherAdapter,
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

export const makeGetUserBalanceController = () => {
    const postgresGetUserBalanceRepository =
        new PostgresGetUserBalanceRepository()
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        postgresGetUserBalanceRepository,
        postgresGetUserByIdRepository,
    )

    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase,
    )

    return getUserBalanceController
}
