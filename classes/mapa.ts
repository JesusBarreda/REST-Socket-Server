import { Marcador } from './marcador';

export class Mapa {
  private marcadores: {[key: string]: Marcador} = {
    '1': {
      id: '1',
      nombre: 'Jesús',
      lng: -3.684567,
      lat: 40.41549,
      color: '#dd8fee'
    },

    '2': {
      id: '2',
      nombre: 'Alex',
      lng: -3.68641, 
      lat: 40.41652,
      color: '#790af0'
    },

    '3': {
      id: '3',
      nombre: 'Alberto',
      lng: -3.68112, 
      lat: 40.41420,
      color: '#19884b'
    }
  };

  constructor() {}

  getMarcadores() {
    return this.marcadores;
  }

  agregarMarcador(marcador: Marcador) {
    this.marcadores[marcador.id] = marcador;
  }

  borrarMarcador(id: string) {
    delete this.marcadores[id];
    return this.getMarcadores();
  }

  moverMarcador(marcador: Marcador) {
    this.marcadores[marcador.id].lng = marcador.lng;
    this.marcadores[marcador.id].lat = marcador.lat;
  }          
}