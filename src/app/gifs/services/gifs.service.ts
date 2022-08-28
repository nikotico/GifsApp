import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'//Lo hace global
})
export class GifsService {
  private apiKey: string = 'wkhgY6FEAQHbfmv25IsKACaR6hQcH1bH';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public results: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private _http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];

  }

  gifBusqueda(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));//Grabar en el localStorage del buscador
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this._http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
    .subscribe((resp) => {
      console.log(resp.data);
      this.results = resp.data;
      localStorage.setItem('results', JSON.stringify(this.results));//Grabar en el localStorage del buscador
    })
  }


}
