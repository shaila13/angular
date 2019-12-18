import { Component } from '@angular/core';
import { ANIMALES } from '../../assets/data.animales';
import { Animal } from '../animal.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animales: Animal[];
  audio = new Audio();
  tiempoAudio: any;


  constructor() {
    this.animales = ANIMALES.slice(0);

  }

 reproducir(animal: Animal) {

    this.pausarAudio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;
    animal.reproduciendo = true;
    this.audio.load();
    this.audio.play();
    console.log(animal);

    this.tiempoAudio = setTimeout(() => {
        animal.reproduciendo = false;
    }, animal.duracion * 1000);
}

  private pausarAudio( animalSeleccionado: Animal) {
    clearTimeout(this.tiempoAudio);

    this.audio.pause();
    this.audio.currentTime = 0;

    for (const animal of this.animales) {
      if (animal.nombre !== animalSeleccionado.nombre) {
        animal.reproduciendo = false;
      }
    }
  }
}
