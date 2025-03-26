import validator from 'validator'
import { badRequest, notFound } from './http.js'

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

export const userNotFoundResponse = () => {
    return notFound({
        message: 'User not found',
    })
}

export const checkIfPasswordIsValid = (password) => {
    return password.length >= 6
}

export const checkIfEmailIsValid = (email) => {
    return validator.isEmail(email)
}
