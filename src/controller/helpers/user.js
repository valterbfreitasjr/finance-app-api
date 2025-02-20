import validator from 'validator'
import { badRequest } from './http.js'

export const invalidPasswordResponse = () => {
    return badRequest({
        message: 'Password must be at least 6 characters.',
    })
}

export const invalidEmailIsAlreadyInUseResponse = () => {
    return badRequest({
        message: 'Invalid Email.',
    })
}

export const invalidIdResponde = () => {
    return badRequest({
        message: 'Invalid user id',
    })
}

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

export const checkIfUuidIsValid = (userId) => validator.isUUID(userId)
