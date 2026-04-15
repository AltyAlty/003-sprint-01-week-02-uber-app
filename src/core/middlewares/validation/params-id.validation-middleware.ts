/*Импортируем метод "param()" из библиотеки express-validator, чтобы проверять id.*/
import { param } from 'express-validator';

/*Создаем middleware "idValidation". Этот middleware проверяет, что id:
1. Существует в запросе.
2. Является строкой.
3. Не является пустым.
4. Состоит только из цифр.*/
export const idValidation = param('id')
  .exists()
  .withMessage('ID is required')
  .isString()
  .withMessage('ID must be a string')
  .isLength({ min: 1 })
  .withMessage('ID must not be empty')
  .isNumeric()
  .withMessage('ID must be a numeric string');
