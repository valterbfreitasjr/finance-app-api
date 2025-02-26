import validator from 'validator'
import { badRequest } from './http.js'

export const invalidIdResponse = () => {
    return badRequest({
        message: 'Invalid user id',
    })
}

export const checkIfUuidIsValid = (userId) => validator.isUUID(userId)
