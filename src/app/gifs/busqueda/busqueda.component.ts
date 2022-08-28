import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {

  //Decorator para hacer uso del DOM
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;//! == not null assertion operator

  constructor(private gifsService:GifsService) {}

  buscar(): void{
    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length === 0) return;
    
    this.gifsService.gifBusqueda(valor);

    this.txtBuscar.nativeElement.value = '';
  }


}
