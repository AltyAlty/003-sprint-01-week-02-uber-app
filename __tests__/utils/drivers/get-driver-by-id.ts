import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { Driver } from '../../../src/drivers/types/driver';
import { DRIVERS_PATH } from '../../../src/core/paths/path';

/*Создаем функцию "getDriverById()", получающую данные о водителе по ID и возвращающую их, для целей тестирования.*/
export async function getDriverById(app: Express, driverId: number): Promise<Driver> {
  const driverResponse = await request(app)
    .get(`${DRIVERS_PATH}/${driverId}`)
    .set('Authorization', generateBasicAuthToken())
    .expect(HttpStatus.Ok);

  return driverResponse.body;
}
