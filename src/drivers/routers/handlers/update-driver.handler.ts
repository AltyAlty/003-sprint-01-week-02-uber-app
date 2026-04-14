import { Request, Response } from 'express';
import { Driver } from '../../types/driver';
import { db } from '../../../db/in-memory.db';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { vehicleInputDtoValidation } from '../../validation/vehicleInputDtoValidation';

export const updateDriverHandler = (
  req: Request<{ id: string }, {}, Driver, {}>,
  res: Response,
) => {
  /*Ищем водителя в БД.*/
  const id = parseInt(req.params.id);
  const index = db.drivers.findIndex((v) => v.id === id);

  /*Если водитель не был найден, то сообщаем об этом клиенту.*/
  if (index === -1) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]),
      );

    return;
  }

  /*Если водитель был найден, то проводим валидацию DTO для входных данных по водителю, которого нужно изменить.*/
  const errors = vehicleInputDtoValidation(req.body);

  /*Если были ошибки валидации, то сообщаем об этом клиенту.*/
  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
    return;
  }

  /*Если ошибок валидации не было, то обновляем данные водителя в БД и сообщаем об этом клиенту.*/
  const driver = db.drivers[index];
  driver.name = req.body.name;
  driver.phoneNumber = req.body.phoneNumber;
  driver.email = req.body.email;
  driver.vehicleMake = req.body.vehicleMake;
  driver.vehicleModel = req.body.vehicleModel;
  driver.vehicleYear = req.body.vehicleYear;
  driver.vehicleLicensePlate = req.body.vehicleLicensePlate;
  driver.vehicleDescription = req.body.vehicleDescription;
  driver.vehicleFeatures = req.body.vehicleFeatures;
  res.sendStatus(HttpStatus.NoContent);
};
