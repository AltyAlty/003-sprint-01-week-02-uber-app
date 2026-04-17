import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { driversRepository } from '../../repositories/drivers.repository';

/*Создаем функцию-обработчика "deleteDriverHandler()" для DELETE-запросов для удаления водителя по ID при помощи
URI-параметров.*/
export const deleteDriverHandler = (req: Request<{ id: string }, {}, {}, {}>, res: Response) => {
  const id = parseInt(req.params.id);
  /*Просим репозиторий "driversRepository" найти данные по водителю в БД.*/
  const driver = driversRepository.findById(id);

  /*Если водитель не был найден, то сообщаем об этом клиенту.*/
  if (!driver) {
    res.status(HttpStatus.NotFound).send(createErrorMessages([{ field: 'id', message: 'Driver was not found' }]));
    return;
  }

  /*Если водитель был найден, то просим репозиторий "driversRepository" удалить его из БД.*/
  driversRepository.delete(id);
  /*Сообщаем об успешном удалении водителя клиенту.*/
  res.sendStatus(HttpStatus.NoContent);
};
