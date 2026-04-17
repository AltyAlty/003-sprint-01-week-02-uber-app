import { Driver } from '../types/driver';
import { db } from '../../db/in-memory.db';
import { DriverInputDto } from '../dto/driver.input-dto';

/*Создаем репозиторий "driversRepository" для работы с данными по водителям в БД.*/
export const driversRepository = {
  /*Создаем метод "findAll()" для получения данных по всем водителям из БД.*/
  findAll(): Driver[] {
    return db.drivers;
  },

  /*Создаем метод "findById()" для получения данных по водителю по ID из БД.*/
  findById(id: number): Driver | null {
    return db.drivers.find((d) => d.id === id) ?? null;
  },

  /*Создаем метод "create()" для добавления нового водителя в БД.*/
  create(newDriver: Driver): Driver {
    db.drivers.push(newDriver);
    return newDriver;
  },

  /*Создаем метод "update()" для изменения данных водителя по ID в БД.*/
  update(id: number, dto: DriverInputDto): void {
    const driver = this.findById(id);
    if (!driver) throw new Error('Driver does not exist');
    driver.name = dto.name;
    driver.phoneNumber = dto.phoneNumber;
    driver.email = dto.email;
    driver.vehicleMake = dto.vehicleMake;
    driver.vehicleModel = dto.vehicleModel;
    driver.vehicleYear = dto.vehicleYear;
    driver.vehicleLicensePlate = dto.vehicleLicensePlate;
    driver.vehicleDescription = dto.vehicleDescription;
    driver.vehicleFeatures = dto.vehicleFeatures;
    return;
  },

  /*Создаем метод "delete()" для удаления водителя по ID в БД.*/
  delete(id: number): void {
    const index = db.drivers.findIndex((d) => d.id === id);
    if (index === -1) throw new Error('Driver does not exist');
    db.drivers.splice(index, 1);
    return;
  },
};
