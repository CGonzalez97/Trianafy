import { Router } from 'express';

const router = Router();

/*
router.get('/lists', );
router.post('/lists', );
router.get('/lists/{id}', );
router.put('/lists/{id}', );
router.delete('/lists/{id}', );

router.get('/lists/{idL}/songs', );
router.post('/lists/{idL}/songs/{idS}', );
router.get('/lists/{idL}/songs/{idS}', );
router.delete('/lists/{idL}/songs/{idS}', );
*/

router.get('/', );
router.post('/', );
router.get('/{id}', );
router.put('/{id}', );
router.delete('/{id}', );

router.get('/{idL}/songs', );
router.post('/{idL}/songs/{idS}', );
router.get('/{idL}/songs/{idS}', );
router.delete('/{idL}/songs/{idS}', );

export default router;