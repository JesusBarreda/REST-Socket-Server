import { Usuario } from './usuario';

export class UsuariosLista {
  private lista: Usuario[] = [];
  
  constructor() { }

  public agregar(usuario: Usuario) {
    console.log('Agregando usuario...');
    this.lista.push(usuario);
    console.log(this.lista);
    return usuario;
  }

  public actualizarNombre(id: string, nombre: string) {
    console.log('Actualizando usuario...');
    for (let usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre;
        break;
      }
    }

    console.log(this.lista);
  }

  public getLista() {
    return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
  }

  public getUsuario(id: string) {
    return this.lista.find(usuario => {
      return usuario.id === id;
    });
  }

  public borrarUsuario(id: string) {
    console.log('Borrando usuario...');
    const tempUsuario = this.getUsuario(id);
    this.lista = this.lista.filter(usuario => {
      return usuario.id !== id;
    });

    console.log(this.lista);

    return tempUsuario;
  }
}
