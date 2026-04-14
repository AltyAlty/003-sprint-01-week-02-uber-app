import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { db } from '../../../db/in-memory.db';

export const getDriverListHandler = (req: Request, res: Response) => {
  res.status(HttpStatus.Ok).send(db.drivers);
};
