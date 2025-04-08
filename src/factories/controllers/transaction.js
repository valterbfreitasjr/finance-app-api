import {
    CreateTransactionController,
    GetTransactionByUserIdController,
    UpdateTrasactionController,
    DeleteTransactionController,
} from '../../controllers/index.js'

import {
    PostgresCreateTransactionRepository,
    PostgresGetTransactionByUserIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepository,
    PostgresDeleteTransactionRepository,
    PostgresGetTransactionByIdRepository,
} from '../../repositories/postgres/index.js'

import {
    CreateTransactionUseCase,
    GetTransactionByUserIdUseCase,
    UpdateTransactionUseCase,
    DeleteTransactionUseCase,
} from '../../use-cases/index.js'

import { IdGeneratorAdapter } from '../../adapters/index.js'

export const makeCreateTransactionController = () => {
    const idGeneratorAdapter = new IdGeneratorAdapter()

    const postgresCreateTransactionRepository =
        new PostgresCreateTransactionRepository()
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()

    const createTransactionUseCase = new CreateTransactionUseCase(
        postgresCreateTransactionRepository,
        postgresGetUserByIdRepository,
        idGeneratorAdapter,
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

export const makeDeleteTransactionController = () => {
    const postgresDeleteTransactionRepository =
        new PostgresDeleteTransactionRepository()
    const postgresGetTransactionByIdRepository =
        new PostgresGetTransactionByIdRepository()

    const deleteTransactionUseCase = new DeleteTransactionUseCase(
        postgresDeleteTransactionRepository,
        postgresGetTransactionByIdRepository,
    )

    const deleteTransactionController = new DeleteTransactionController(
        deleteTransactionUseCase,
    )

    return deleteTransactionController
}
