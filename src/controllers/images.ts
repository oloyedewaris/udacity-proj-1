import { Request, Response } from 'express';
import { mkdirSync, existsSync } from 'fs';
import imageProcessing from '../utils/imageProcessing';

export default (req: Request, res: Response): void => {
  const { filename, width, height } = req.query;

  if (!existsSync('cache')) {
    mkdirSync('cache');
  }

  if (existsSync(`cache/${width}-${height}-${filename}`)) {
    res
      .status(200)
      .sendFile(`${width}-${height}-${filename}`, { root: 'cache' });
  } else {
    imageProcessing(req, res);
  }
};
