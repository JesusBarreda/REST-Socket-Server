import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { SERVER_PORT } from '../global/environment';
import * as socket from '../sockets/socket';

export default class Server {
  private static _instance: Server;
  public app: express.Application;
  public port: number;
  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = new socketIO.Server(this.httpServer, {
      cors: {
        origin: true,
        credentials: true
      }
    });

    this.escucharSockets();
  }

  public static get instance(): Server {
    return this._instance || (this._instance = new this());
  }

  start(callback: Function) {
    this.httpServer.listen(this.port, callback());
  }

  escucharSockets(): void {
    console.log('Escuchando conexiones (sockets)...');
    this.io.on('connection', cliente => {
      console.log('Cliente conectado');

      // Conectar usuario
      socket.conectar(cliente);

      // Pendiente de la configuración del usuario
      socket.configurarUsuario(cliente, this.io);

      // Pendiente de los mensajes
      socket.mensaje(cliente, this.io);

      // Pendiente de la solicitud de usuarios conectados
      socket.obtenerUsuarios(cliente, this.io);

      // Pendiente de la creación de nuevos marcadores
      socket.mapaSockets(cliente);

      // Pendiente de la desconexión
      socket.desconectar(cliente, this.io);
    });
  }
}