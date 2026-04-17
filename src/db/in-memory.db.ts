import { Driver, VehicleFeature } from '../drivers/types/driver';
import { Currency, Ride } from '../rides/types/ride';

/*Моковая БД.*/
export const db = {
  drivers: <Driver[]>[
    {
      id: 1,
      name: 'Tom Rider',
      phoneNumber: '123-456-7890',
      email: 'tom.rider@example.com',
      vehicleMake: 'BMW',
      vehicleModel: 'Cabrio',
      vehicleYear: 2020,
      vehicleLicensePlate: 'ABC-32145',
      vehicleDescription: null,
      vehicleFeatures: [],
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Tom Smith',
      phoneNumber: '123-456-7890',
      email: 'tom.smith@example.com',
      vehicleMake: 'Ford',
      vehicleModel: 'Mustang Shelby GT',
      vehicleYear: 2019,
      vehicleLicensePlate: 'XYZ-21342',
      vehicleDescription: null,
      vehicleFeatures: [VehicleFeature.WiFi, VehicleFeature.ChildSeat],
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'Tom April',
      phoneNumber: '123-456-7890',
      email: 'tom.april@example.com',
      vehicleMake: 'BMW',
      vehicleModel: '18',
      vehicleYear: 2021,
      vehicleLicensePlate: 'LMN-31234',
      vehicleDescription: null,
      vehicleFeatures: [],
      createdAt: new Date(),
    },
  ],

  rides: <Ride[]>[
    {
      id: 1,
      clientName: 'Michael',
      driverId: 2,
      driverName: 'Tom Smith',
      vehicleLicensePlate: 'XYZ-21342',
      vehicleName: 'Mustang Shelby GT',
      price: 300,
      currency: Currency.USD,
      createdAt: new Date(),
      updatedAt: null,
      addresses: {
        from: 'A',
        to: 'B',
      },
    },
    {
      id: 2,
      clientName: 'Jim',
      driverId: 1,
      driverName: 'Tom Rider',
      vehicleLicensePlate: 'ABC-32145',
      vehicleName: 'Cabrio',
      price: 100,
      currency: Currency.EUR,
      createdAt: new Date(),
      updatedAt: null,
      addresses: {
        from: 'C',
        to: 'D',
      },
    },
  ],
};
