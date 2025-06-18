import { Component, inject } from '@angular/core';
import { ApiFetchService } from '../service/api-fetch/api-fetch.service';
import {map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {PokeSummary} from '../../interface/poke-summary';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.css'
})
export class PokeListComponent {
  // Injection of the service
  private pokeService = inject(ApiFetchService);
  // Get all pokemon from the api using the imported service
  public pokes$: Observable<PokeSummary[]> = this.pokeService.getAllPoke();


  // Get the index of a pokemon in the array of pokemon
  getPokeIndex(poke: PokeSummary): number {
  // Extract the ID from the URL
  // URL format is like: https://pokeapi.co/api/v2/pokemon/1/
  const urlParts = poke.url.split('/');
  // Get the ID which is the second-to-last part (before the trailing slash)
  return parseInt(urlParts[urlParts.length - 2], 10);
}
}
