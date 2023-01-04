import Express, { Application, Request, Response } from 'express'
import imageRoute from './controllers/images';

const app: Application = Express();
const router = Express.Router();

app.use('/api', router);
app.get('/', (req: Request, res: Response) => res.send('Api Working'));

router.get('/images', imageRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App working at port ${port}`));

export default app;