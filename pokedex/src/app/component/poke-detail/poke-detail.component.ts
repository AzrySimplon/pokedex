import { Component, OnInit, inject } from '@angular/core';
import {AsyncPipe, TitleCasePipe} from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ApiFetchService } from '../service/api-fetch/api-fetch.service';
import { Poke } from '../../interface/poke';

@Component({
  selector: 'app-poke-detail',
  standalone: true,
  imports: [AsyncPipe, TitleCasePipe, RouterLink],
  templateUrl: './poke-detail.component.html',
  styleUrl: './poke-detail.component.css'
})
export class PokeDetailComponent implements OnInit {
  // Injection of the service ActivatedRoute
  private route = inject(ActivatedRoute);
  // Injection of the service apiFetchService
  private apiService = inject(ApiFetchService);

  // Observable that emits the Pokemon
  public poke$!: Observable<Poke>;

  ngOnInit(): void {
    // Extract the id from the route params and fetch the Pokemon
    this.poke$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.apiService.getPoke(id);
      })
    );
  }
}
