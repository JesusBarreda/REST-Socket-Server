import { Router, Request, Response } from 'express';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'Todo está bien'
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
  const mensaje = req.body.mensaje;
  const de = req.body.de;

  res.json({
    ok: true,
    mensaje,
    de
  });
});

router.get('/mensajes/:id', (req: Request, res: Response) => {
  const mensaje = req.body.mensaje;
  const de = req.body.de;
  const id = req.params.id;

  res.json({
    ok: true,
    mensaje,
    de,
    id
  });
});

export default router;