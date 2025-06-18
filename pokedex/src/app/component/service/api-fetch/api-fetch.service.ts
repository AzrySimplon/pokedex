import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PokeSummary } from '../../../interface/poke-summary';
import { Poke } from '../../../interface/poke';

interface PokeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeSummary[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiFetchService {
  // instantiation of the http client
  private http = inject(HttpClient);
  // set url to the pokeapi
  private readonly url = 'https://pokeapi.co/api/v2/pokemon';

  // Get all pokemon from an array of objects
  getAllPoke(): Observable<PokeSummary[]> {
    return this.http.get<PokeApiResponse>(`${this.url}?limit=50`)
      .pipe(
        map(response => response.results)
      );
  }

  // Get a pokemon by id as an object
  getPoke(id: number): Observable<Poke> {
    return this.http.get<Poke>(`${this.url}/${id}`);
  }
}
