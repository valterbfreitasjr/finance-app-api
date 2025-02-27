import {
    CreateTransactionController,
    GetTransactionByUserIdController,
    UpdateTrasactionController,
} from '../../controllers/index.js'

import {
    PostgresCreateTransactionRepository,
    PostgresGetTransactionByUserIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepository,
} from '../../repositories/postgres/index.js'

import {
    CreateTransactionUseCase,
    GetTransactionByUserIdUseCase,
    UpdateTransactionUseCase,
} from '../../use-cases/index.js'

export const makeCreateTransactionController = () => {
    const postgresCreateTransactionRepository =
        new PostgresCreateTransactionRepository()
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()

    const createTransactionUseCase = new CreateTransactionUseCase(
        postgresCreateTransactionRepository,
        postgresGetUserByIdRepository,
    )

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}

export const makeGetTransactionByUserIdController = () => {
    const postgresGetTransactionByUserIdRepository =
        new PostgresGetTransactionByUserIdRepository()
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()

    const getTransactionByUserIdUseCase = new GetTransactionByUserIdUseCase(
        postgresGetTransactionByUserIdRepository,
        postgresGetUserByIdRepository,
    )

    const getTransactionByUserIdController =
        new GetTransactionByUserIdController(getTransactionByUserIdUseCase)

    return getTransactionByUserIdController
}

export const makeUpdateTransactionController = () => {
    const postgresUpdateTransactionRepository =
        new PostgresUpdateTransactionRepository()

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        postgresUpdateTransactionRepository,
    )

    const updateTrasactionController = new UpdateTrasactionController(
        updateTransactionUseCase,
    )

    return updateTrasactionController
}
