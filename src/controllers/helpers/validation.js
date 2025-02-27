import validator from 'validator'
import { badRequest } from './http.js'

export const invalidIdResponse = () => {
    return badRequest({
        message: 'Invalid user id',
    })
}

export const checkIfUuidIsValid = (userId) => {
    return validator.isUUID(userId)
}

export const checkIfIsString = (value) => {
    return typeof value === 'string'
}

export const checkIfFieldIsEmpty = (field) => {
    return validator.isEmpty(field)
}

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

export const notAllowedFieldsResponse = () => {
    return badRequest({
        message: 'Some field is not allowed.',
    })
}
