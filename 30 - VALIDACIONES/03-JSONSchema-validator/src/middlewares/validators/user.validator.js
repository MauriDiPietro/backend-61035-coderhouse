//npm i ajv ajv-errors ajv-formats @sinclair/typebox

import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

const ajv = new Ajv({ allErrors: true })
addFormats(ajv, ['email'])
addErrors(ajv)

const registerSchema = Type.Object({
    first_name: Type.String(),
    last_name: Type.String(),
    email: Type.String({
        format: 'email',
        errorMessage: {
            type: 'Debe ser un texto',
            format: 'Debe ser un email válido'
        }
    }),
    password: Type.String()
});

const validate = ajv.compile(registerSchema);

export const validatorRegister = (req, res, next) => {
    const isValid = validate(req.body);
    if(!isValid) res.status(404).send(ajv.errorsText(validate.errors, { separator: "\n" }));
    else next();
};