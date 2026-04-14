import { Router } from 'express';
import { getDriverListHandler } from './handlers/get-driver-list.handler';
import { getDriverByIdHandler } from './handlers/get-driver-by-id.handler';
import { createDriverHandler } from './handlers/create-driver.handler';
import { updateDriverHandler } from './handlers/update-driver.handler';
import { deleteDriverHandler } from './handlers/delete-driver.handler';

/*Создаем роутер из Express для работы с данными по водителям.*/
export const driversRouter = Router({});

/*Конфигурируем роутер "driversRouter".*/
driversRouter
  /*GET-запрос для получения данных по всем водителям.*/
  .get('', getDriverListHandler)

  /*GET-запрос для поиска водителя по id при помощи URI-параметров. При помощи ":" Express позволяет указывать
  переменные в пути. Такие переменные доступны через объект "req.params".*/
  .get('/:id', getDriverByIdHandler)

  /*POST-запрос для добавления нового водителя.*/
  .post('', createDriverHandler)

  /*PUT-запрос для изменения данных водителя по id при помощи URI-параметров.*/
  .put('/:id', updateDriverHandler)

  /*DELETE-запрос для удаления водителя по id при помощи URI-параметров.*/
  .delete('/:id', deleteDriverHandler);
