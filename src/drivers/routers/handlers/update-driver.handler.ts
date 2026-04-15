import { Request, Response } from 'express';
import { Driver } from '../../types/driver';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { vehicleInputDtoValidation } from '../../validation/vehicleInputDtoValidation';
import { driversRepository } from '../../repositories/drivers.repository';

/*Создаем функцию-обработчика "updateDriverHandler()" для PUT-запросов для изменения данных водителя по id при помощи
URI-параметров.*/
export const updateDriverHandler = (
  req: Request<{ id: string }, {}, Driver, {}>,
  res: Response,
) => {
  const id = parseInt(req.params.id);
  /*Проводим валидацию DTO для входных данных по водителю, которого нужно изменить.*/
  const errors = vehicleInputDtoValidation(req.body);

  /*Если были ошибки валидации, то сообщаем об этом клиенту.*/
  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
    return;
  }

  /*Просим репозиторий "driversRepository" найти данные по водителю в БД.*/
  const driver = driversRepository.findById(id);

  /*Если водитель не был найден, то сообщаем об этом клиенту.*/
  if (!driver) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Driver was not found' }]),
      );

    return;
  }

  /*Если водитель был найден, то просим репозиторий "driversRepository" обновить данные водителя в БД.*/
  driversRepository.update(id, req.body);
  /*Сообщаем об успешном обновлении данных водителя в БД клиенту.*/
  res.sendStatus(HttpStatus.NoContent);
};
