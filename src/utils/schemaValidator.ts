import Ajv, { Schema } from 'ajv';
import addFormats from 'ajv-formats';
import { logger } from './logger';

const ajv = new Ajv({ allErrors: true, verbose: true });
// @ts-ignore
addFormats(ajv);

export function validateSchema(schema: Schema, data: any): { valid: boolean; errors?: string[] } {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    const errorMsgs = validate.errors?.map(err => `${err.instancePath} ${err.message}`) || [];
    logger.error('JSON Schema Validation Errors: ' + JSON.stringify(errorMsgs));
    return { valid: false, errors: errorMsgs };
  }
  return { valid: true };
}
