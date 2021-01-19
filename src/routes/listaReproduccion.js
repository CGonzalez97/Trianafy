import { Router } from 'express';

const router = Router();

router.get('/lists', /* método controlador */);
router.post('/lists', /* método controlador */);
router.get('/lists/{id}', /* método controlador */);
router.put('/lists/{id}', /* método controlador */);
router.delete('/lists/{id}', /* método controlador */);

router.get('/lists/{idL}/songs', /* método controlador */);
router.post('/lists/{idL}/songs/{idS}', /* método controlador */);
router.get('/lists/{idL}/songs/{idS}', /* método controlador */);
router.delete('/lists/{idL}/songs/{idS}', /* método controlador */);

export default router;