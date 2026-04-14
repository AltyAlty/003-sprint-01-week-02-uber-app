import { Request, Response } from 'express';
import { Driver } from '../../types/driver';
import { db } from '../../../db/in-memory.db';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';

/*"Request" из Express используется для типизации параметра "req", а "Response" из Express используется для типизации
параметра "res".

Типизация первого параметра "req" второго параметра в виде асинхронной функции методов "get()", "post()", "delete()" и
"put()" внутри роутеров из Express:
1. На первом месте в типе идут URI-параметры.
2. На втором месте в типе идет "ResBody". Относится к параметру "res" внутри запроса, то есть что будет возвращено.
3. На третьем месте в типе идет "ReqBody". Это то, что приходит в body в запросе.
4. На четвертом месте в типе идут Query-параметры.*/
export const getDriverByIdHandler = (
  req: Request<{ id: string }, Driver, {}, {}>,
  res: Response<Driver | null | unknown>,
) => {
  /*Ищем водителя в БД. Метод "parseInt()" возвращает целое число на основе параметра.*/
  const id = parseInt(req.params.id);
  const driver = db.drivers.find((d) => d.id === id);

  /*Если водитель не был найден, то сообщаем об этом клиенту.*/
  if (!driver) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
      );

    return;
  }

  /*Если водитель был найден, то сообщаем об этом клиенту.*/
  res.status(HttpStatus.Ok).send(driver);
};
