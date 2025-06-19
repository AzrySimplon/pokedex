import { Component, inject } from '@angular/core';
import { ApiFetchService } from '../service/api-fetch/api-fetch.service';
import {map, Observable} from 'rxjs';
import {AsyncPipe, TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Poke} from '../../interface/poke';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    FormsModule,
    TitleCasePipe
  ],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.css'
})
export class PokeListComponent {
  // Injection of the service
  private pokeService = inject(ApiFetchService);
  // Get all pokemon from the api using the imported service
  public allPokes$: Observable<Poke[]> = this.pokeService.getAllPoke();
  // property stores the filtered pokemon
  public displayedPokes$: Observable<Poke[]> = this.allPokes$;
  // Get all types from the api using the imported service
  public types$: Observable<string[]> = this.pokeService.getTypes();
  // property stores the selected type
  public selectedType: String = "";
  // property stores the selected alphabetical order value
  public alphabeticalOrder: string = "";
  //property stores the search term
  public searchTerm: string = "";

  // Add this method to handle any filter changes
  onSearchChange(): void {

    this.displayedPokes$ = this.allPokes$.pipe(
      map(pokes => {
        // First apply type filter if there's a selected type
        let filteredPokes = pokes;
        if (this.selectedType) {
          filteredPokes = pokes.filter(poke =>
            poke.types.some(typeInfo => typeInfo.type.name.toLowerCase() === this.selectedType.toLowerCase())
          );
        }

        // Then apply search term filter
        if (this.searchTerm) {
          filteredPokes = pokes.filter(poke =>
            poke.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        }

        // Then sort based on alphabetical order selection
        if (this.alphabeticalOrder === "1") { // A-Z
          return [...filteredPokes].sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.alphabeticalOrder === "2") { // Z-A
          return [...filteredPokes].sort((a, b) => b.name.localeCompare(a.name));
        }

        return filteredPokes;
      })
    );
  }
}
