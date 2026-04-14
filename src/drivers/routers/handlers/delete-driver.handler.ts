import { Request, Response } from 'express';
import { db } from '../../../db/in-memory.db';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';

export const deleteDriverHandler = (
  req: Request<{ id: string }, {}, {}, {}>,
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

  /*Если водитель был найден, то удаляем его из БД и сообщаем об этом клиенту.*/
  db.drivers.splice(index, 1);
  res.sendStatus(HttpStatus.NoContent);
};