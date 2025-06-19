import { Component, inject } from '@angular/core';
import { ApiFetchService } from '../service/api-fetch/api-fetch.service';
import {map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Poke} from '../../interface/poke';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    FormsModule
  ],
  templateUrl: './poke-list.component.html',
  styleUrl: './poke-list.component.css'
})
export class PokeListComponent {
  // Injection of the service
  private pokeService = inject(ApiFetchService);
  // Get all pokemon from the api using the imported service
  public allPokes$: Observable<Poke[]> = this.pokeService.getAllPoke();
  public displayedPokes$: Observable<Poke[]> = this.allPokes$;
  public types$: Observable<String[]> = this.pokeService.getTypes();
  public selectedType: String = "";

  onTypeChange(): void {
    this.displayedPokes$ = this.allPokes$.pipe(
      map(pokes => {
        if (!this.selectedType) {
          return pokes;
        }
        return pokes.filter(poke =>
          poke.types.some(typeInfo => typeInfo.type.name.toLowerCase() === this.selectedType.toLowerCase())
        );
      })
    );
  }

}
