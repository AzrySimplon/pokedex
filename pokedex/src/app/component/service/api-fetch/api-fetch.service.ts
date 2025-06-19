import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, forkJoin } from 'rxjs';
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
  private readonly url = 'https://pokeapi.co/api/v2/';

  // Get all pokemon from an array of objects
  getAllPoke(): Observable<Poke[]> {
  return this.http.get<PokeApiResponse>(`${this.url}pokemon?limit=50`).pipe(
    // Extract the results array from the response
    map(response => response.results),
    // Switch to a new observable that fetches details for each Pokemon
    switchMap(pokeSummaries => {
      // Create an array of observables, one for each Pokemon
      const pokeObservables = pokeSummaries.map(summary =>
        this.getPokeByUrl(summary.url)
      );
      // Combine all observables into a single observable that emits an array
      return forkJoin(pokeObservables);
    })
  );
}

  // Get a pokemon by its own url
  getPokeByUrl(url: string): Observable<Poke> {
    return this.http.get<Poke>(url);
  }

  // Get a pokemon by id as an object
  getPoke(id: number): Observable<Poke> {
    return this.http.get<Poke>(`${this.url}pokemon/${id}`);
  }

  // Get all types as an array of strings
  getTypes(): Observable<string[]> {
    return this.http.get<PokeApiResponse>(`${this.url}type`).pipe(
      map(response => response.results.map(type => type.name))
    );
  }
}
