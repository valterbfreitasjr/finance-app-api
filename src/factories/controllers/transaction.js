import {
    CreateTransactionController,
    GetTransactionByUserIdController,
    UpdateTrasactionController,
} from '../../controllers/index.js'
import { DeleteTransactionController } from '../../controllers/transaction/delete-transaction.js'

import {
    PostgresCreateTransactionRepository,
    PostgresGetTransactionByUserIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepository,
} from '../../repositories/postgres/index.js'
import { PostgresDeleteTransactionRepository } from '../../repositories/postgres/transaction/delete-transaction.js'
import { PostgresGetTransactionByIdRepository } from '../../repositories/postgres/transaction/get-transaction-by-id.js'

import {
    CreateTransactionUseCase,
    GetTransactionByUserIdUseCase,
    UpdateTransactionUseCase,
} from '../../use-cases/index.js'
import { DeleteTransactionUseCase } from '../../use-cases/transaction/delete-transaction.js'

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
