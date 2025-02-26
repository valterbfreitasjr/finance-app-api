import validator from 'validator'
import { badRequest } from './http.js'

export const invalidIdResponse = () => {
    return badRequest({
        message: 'Invalid user id',
    })
}

export const checkIfUuidIsValid = (userId) => validator.isUUID(userId)

export const checkIfIsString = (value) => typeof value === 'string'

export const requiredFieldIsMissingResponse = (field) => {
    return badRequest({
        message: `The field ${field} is required!`,
    })
}

export const validateRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const fieldIsMissing = !params[field]
        const fieldIsEmpty =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], {
                ignore_whitespace: true,
            })

        if (fieldIsMissing || fieldIsEmpty) {
            return {
                missingField: field,
                ok: false,
            }
        }
    }

    return {
        missingField: undefined,
        ok: true,
    }
}
