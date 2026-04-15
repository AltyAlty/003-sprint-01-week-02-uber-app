import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../src/auth/middlewares/super-admin.guard-middleware';

/*Создаем функцию "generateBasicAuthToken()" для генерации токена для Basic авторизации для целей тестирования.*/
export function generateBasicAuthToken() {
  const credentials = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`;
  const token = Buffer.from(credentials).toString('base64');
  return `Basic ${token}`;
}
