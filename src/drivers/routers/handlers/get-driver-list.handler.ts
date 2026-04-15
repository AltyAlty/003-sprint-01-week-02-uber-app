import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { driversRepository } from '../../repositories/drivers.repository';

/*Создаем функцию-обработчика "getDriverListHandler()" для GET-запросов для получения данных по всем водителям.*/
export const getDriverListHandler = (req: Request, res: Response) => {
  /*Просим репозиторий "driversRepository" найти данные по всем водителям в БД.*/
  const drivers = driversRepository.findAll();
  res.status(HttpStatus.Ok).send(drivers);
};
