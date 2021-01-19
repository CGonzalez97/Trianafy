import { Router } from 'express';

const router = Router();

router.get('/songs', /* método controlador */);
router.post('/songs', /* método controlador */);
router.get('/songs/{id}', /* método controlador */);
router.put('/songs/{id}', /* método controlador */);
router.delete('/songs/{id}', /* método controlador */);



export default router;