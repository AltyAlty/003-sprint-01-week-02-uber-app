import { Request, Response } from 'express';
import { DriverInputDto } from '../../dto/driver.input-dto';
import { driverInputDtoValidation } from '../../validation/driverInputDtoValidation';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { Driver } from '../../types/driver';
import { db } from '../../../db/in-memory.db';
import { driversRepository } from '../../repositories/drivers.repository';

/*Создаем функцию-обработчика "createDriverHandler()" для POST-запросов для добавления нового водителя.*/
export const createDriverHandler = (req: Request<{}, {}, DriverInputDto>, res: Response) => {
  /*Проводим валидацию DTO для входных данных по новому водителю. Сейчас не используется, так как используем валидацию
  при помощи библиотеки express-validator.*/
  // const errors = driverInputDtoValidation(req.body);

  /*Если были ошибки валидации, то сообщаем об этом клиенту. Сейчас не используется, так как используем валидацию при
  помощи библиотеки express-validator.*/
  // if (errors.length > 0) {
  //   res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
  //   return;
  // }

  /*Если ошибок валидации не было, то создаем объект с данными нового водителя.*/
  const newDriver: Driver = {
    /*Генерация случайного id.*/
    id: db.drivers.length ? db.drivers[db.drivers.length - 1].id + 1 : 1,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    vehicleMake: req.body.vehicleMake,
    vehicleModel: req.body.vehicleModel,
    vehicleYear: req.body.vehicleYear,
    vehicleLicensePlate: req.body.vehicleLicensePlate,
    vehicleDescription: req.body.vehicleDescription,
    vehicleFeatures: req.body.vehicleFeatures,
    createdAt: new Date(),
  };

  /*Просим репозиторий "driversRepository" добавить нового водителя в БД.*/
  driversRepository.create(newDriver);
  /*Сообщаем об успешном добавлении нового водителя клиенту.*/
  res.status(HttpStatus.Created).send(newDriver);
};
