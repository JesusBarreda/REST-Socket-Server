import socketIO from 'socket.io';
import { Mapa } from '../classes/mapa';
import { Marcador } from '../classes/marcador';
import { Usuario } from '../classes/usuario';
import { UsuariosLista } from '../classes/usuarios-lista';

export const usuariosConectados = new UsuariosLista();
export const mapa = new Mapa();

export const conectar = (cliente: socketIO.Socket) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);              
}

export const desconectar = (cliente: socketIO.Socket, io: socketIO.Server) => {
  cliente.on('disconnect', (razon: string) => {
    console.log(`Cliente desconectado (${razon})`);
    usuariosConectados.borrarUsuario(cliente.id);

    io.emit('usuarios-activos', usuariosConectados.getLista());
  });
}

export const mensaje = (cliente: socketIO.Socket, io: socketIO.Server) => {
  cliente.on('mensaje', (payload: {de: string, mensaje: string}) => {
    console.log('Mensaje recibido: ', payload);

    io.emit('mensaje-nuevo', payload);
  });
}

export const configurarUsuario = (cliente: socketIO.Socket, io: socketIO.Server) => {
  cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
    console.log('Configurando usuario:', payload.nombre);
    usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

    io.emit('usuarios-activos', usuariosConectados.getLista());

    callback({
      ok: true,
      mensaje: `Usuario ${payload.nombre} configurado`
    });
  });
}

export const obtenerUsuarios = (cliente: socketIO.Socket, io: socketIO.Server) => {
  cliente.on('obtener-usuarios', () => {
    io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
  });
}

export const mapaSockets = (cliente: socketIO.Socket) => {
  cliente.on('marcador-nuevo', (marcador: Marcador) => {
    mapa.agregarMarcador(marcador);
    cliente.broadcast.emit('marcador-nuevo', marcador);
  });

  cliente.on('marcador-borrar', (id: string) => {
    mapa.borrarMarcador(id);
    cliente.broadcast.emit('marcador-borrar', id);
  });

  cliente.on('marcador-mover', (marcador: Marcador) => {
    mapa.moverMarcador(marcador);
    cliente.broadcast.emit('marcador-mover', marcador);
  });
}
