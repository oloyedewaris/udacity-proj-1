import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoints', () => {
    it('it test the /image route', (done) => {
        request.get('/api/images?filename=fjord.jpeg')
            .then(response => {
                expect(response.status).toBe(200);
                done()
            })
            .catch(err => done())
    })
})