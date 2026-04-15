import { ValidationErrorType } from './validationError';

/*DTO для объектов, содержащих массивы с сообщениями об ошибках валидации при использовании библиотеки
express-validator.*/
export type ValidationErrorDto = { errorMessages: ValidationErrorType[] };
