import { Routes } from '@angular/router';
import {PokeListComponent} from './component/poke-list/poke-list.component';
import {PokeDetailComponent} from './component/poke-detail/poke-detail.component';

export const routes: Routes = [
  {path: "", component: PokeListComponent},
  {path: "poke/:id", component: PokeDetailComponent}
];
