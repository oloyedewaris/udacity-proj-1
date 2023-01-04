import { Request, Response } from "express";
import path from "path";
import Sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs'

export default (req: Request, res: Response): void => {
  const { filename, width, height } = req.query

  if (!existsSync('cache')) {
    mkdirSync('cache');
  }

  Sharp(path.resolve(__dirname, `../../images/${filename}`))
    .resize({ width: Number(width) || undefined, height: Number(height) || undefined })
    .toFile(`cache/${width}-${height}-${filename}`)
    .then(() => res.status(200).sendFile(`${width}-${height}-${filename}`, { root: 'cache' }))
    .catch(err => res.status(200).send('File not found or incorrect query parameters'))
}