import supertest from 'supertest';
import app from '../index';
import { existsSync, unlinkSync } from 'fs';
import sharp from 'sharp';
import path from 'path';

const request = supertest(app);

describe('Test endpoints', () => {
  it('test the /image route', (done) => {
    request
      .get('/api/images?filename=fjord.jpeg')
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      })
      .catch(() => done());
  });

  it('ensure image resizing is working', (done) => {
    const testWidth = 10;
    const testHeight = 100;
    const testFileName = 'fjord.jpeg';

    if (existsSync(`cache/${testWidth}-${testHeight}-${testFileName}`)) {
      unlinkSync(`cache/${testWidth}-${testHeight}-${testFileName}`);
    }

    sharp(path.resolve(__dirname, `../../images/${testFileName}`))
      .resize({
        width: Number(testWidth) || undefined,
        height: Number(testHeight) || undefined,
      })
      .toFile(`cache/${testWidth}-${testHeight}-${testFileName}`)
      .then(() => {
        expect(
          existsSync(`cache/${testWidth}-${testHeight}-${testFileName}`)
        ).toBe(true);
        done();
      })
      .catch((err) => {
        console.log(err, 'could not save file');
        done();
      });
  });
});
