import request from 'supertest';
import { Express } from 'express';
import { DriverInputDto } from '../../../src/drivers/dto/driver.input-dto';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { getDriverDto } from './get-driver-dto';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { DRIVERS_PATH } from '../../../src/core/paths/path';

/*Создаем функцию "updateDriver()", изменяющую данные водителя по ID и возвращающую их, для целей тестирования.*/
export async function updateDriverById(app: Express, driverId: number, driverDto?: DriverInputDto): Promise<void> {
  const defaultDriverData: DriverInputDto = getDriverDto();
  const testDriverData = { ...defaultDriverData, ...driverDto };

  const updatedDriverResponse = await request(app)
    .put(`${DRIVERS_PATH}/${driverId}`)
    .set('Authorization', generateBasicAuthToken())
    .send(testDriverData)
    .expect(HttpStatus.NoContent);

  return updatedDriverResponse.body;
}
