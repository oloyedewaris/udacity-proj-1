import { Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';

export default (req: Request, res: Response) => {
  const { filename, width, height } = req.query;

  sharp(path.resolve(__dirname, `../../images/${filename}`))
    .resize({
      width: Number(width) || undefined,
      height: Number(height) || undefined,
    })
    .toFile(`cache/${width}-${height}-${filename}`)
    .then(() => {
      res
        .status(200)
        .sendFile(`${width}-${height}-${filename}`, { root: 'cache' });
    })
    .catch((err) => {
      res.status(200).send('File not found or incorrect query parameters');
    });
};
