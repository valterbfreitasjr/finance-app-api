export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The e-mail ${email} is already in use`)
        this.name = 'EmailAlreadyInUseError'
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`The user with ID: ${userId} not found.`)
        this.name = 'UserNotFoundError'
    }
}

export class TransactionNotFoundError extends Error {
    constructor(transactionId) {
        super(`The transaction ID : ${transactionId} not found.`)
        this.name = 'TransactionNotFoundError'
    }
}
