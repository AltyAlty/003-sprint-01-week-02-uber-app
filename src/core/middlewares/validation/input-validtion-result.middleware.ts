import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { ValidationErrorType } from '../../types/validationError';
import { ValidationErrorDto } from '../../types/validationError.dto';
import { HttpStatus } from '../../types/http-statuses';

/*Создаем функцию "createErrorMessages()" для формирования объектов, содержащих массивы с сообщениями об ошибках
валидации при использовании библиотеки express-validator. На данный момент не используется.*/
export const createErrorMessages = (
  errors: ValidationErrorType[],
): ValidationErrorDto => {
  return { errorMessages: errors };
};

/*Создаем функцию "formatErrors()" для формирования объектов, содержащих сообщения об ошибках валидации при
использовании библиотеки express-validator.*/
const formatErrors = (error: ValidationError): ValidationErrorType => {
  const expressError = error as unknown as FieldValidationError;

  return {
    field: expressError.path,
    message: expressError.msg,
  };
};

export const inputValidationResultMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  /*Извлекаем ошибки валидации из запроса.*/
  const errors = validationResult(req)
    /*Форматируем ошибки валидации при помощи функции "formatErrors()".*/
    .formatWith(formatErrors)
    /*Возвращаем массив, в котором будет находиться только самая первая ошибка валидации.*/
    .array({ onlyFirstError: true });

  /*Если ошибки валидации были найдены, то сообщаем об этом клиенту.*/
  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).json({ errorMessages: errors });
    return;
  }

  /*Передаем управление следующему обработчику.*/
  next();
};
