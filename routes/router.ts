import { Router, Request, Response } from 'express';
import { GraficaData } from '../classes/grafica';
import Server from '../classes/server';
import { mapa, usuariosConectados } from '../sockets/socket';

const router = Router();
const grafica = new GraficaData();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'Todo está bien'
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
  const mensaje = req.body.mensaje;
  const de = req.body.de;

  const payload = {
    de,
    mensaje
  };

  const server = Server.instance;
  server.io.emit('mensaje-nuevo', payload);

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

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const mensaje = req.body.mensaje;
  const de = req.body.de;
  const id = req.params.id;

  const payload = {
    de,
    mensaje
  };

  const server = Server.instance;
  server.io.in(id).emit('mensaje-privado', payload);

  res.json({
    ok: true,
    mensaje,
    de,
    id
  });
});

router.get('/usuarios', (req: Request, res: Response) => {
  const server = Server.instance;
  server.io.allSockets().then(clientes => {
    res.json({
      ok: true,
      clientes: Array.from(clientes)
    });
  }).catch(err => {
    res.json({
      ok: false,
      err
    });
  });
});

router.get('/usuarios/detalle', (req: Request, res: Response) => {
  res.json({
    ok: true,
    clientes: usuariosConectados.getLista()
  });
});

router.get('/grafica', (req: Request, res: Response) => {
  res.json(grafica.getDataGrafica());
});

router.post('/grafica', (req: Request, res: Response) => {
  const mes = req.body.mes;
  const unidades = Number(req.body.unidades);

  grafica.incrementarValor(mes, unidades);

  const server = Server.instance;
  server.io.emit('cambio-grafica', grafica.getDataGrafica());

  res.json(grafica.getDataGrafica());
});

router.get('/mapa', (req: Request, res: Response) => {
  res.json(mapa.getMarcadores());
});

export default router;