import { DriverInputDto } from '../../../src/drivers/dto/driver.input-dto';

/*Создаем функцию "getDriverDto()", возвращающую DTO с корректными данными водителя, для целей тестирования.*/
export function getDriverDto(): DriverInputDto {
  return {
    name: 'Valentin',
    phoneNumber: '123-456-7890',
    email: 'valentin@example.com',
    vehicleMake: 'BMW',
    vehicleModel: 'X5',
    vehicleYear: 2021,
    vehicleLicensePlate: 'ABC-123',
    vehicleDescription: null,
    vehicleFeatures: [],
  };
}
