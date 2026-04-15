import request from 'supertest';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { Express } from 'express';
import { RideInputDto } from '../../../src/rides/dto/ride-input.dto';
import { createDriver } from '../drivers/create-driver';
import { Ride } from '../../../src/rides/types/ride';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { getRideDto } from './get-ride-dto';
import { RIDES_PATH } from '../../../src/core/paths/path';

/*Создаем функцию "createRide()", создающую поездку и возвращающую данные о ней, для целей тестирования.*/
export async function createRide(app: Express, rideDto?: RideInputDto): Promise<Ride> {
  /*Создаем водителя для целей тестирования.*/
  const driver = await createDriver(app);
  /*Получаем DTO с корректными данными поездки для целей тестирования.*/
  const defaultRideData = getRideDto(driver.id);
  /*Разбавляем полученный DTO другими данными, если таковые были переданы.*/
  const testRideData = { ...defaultRideData, ...rideDto };

  const createdRideResponse = await request(app)
    .post(RIDES_PATH)
    .set('Authorization', generateBasicAuthToken())
    .send(testRideData)
    .expect(HttpStatus.Created);

  return createdRideResponse.body;
}
