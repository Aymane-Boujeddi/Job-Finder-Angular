import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllFavorites } from '../store/favorite.selectors';
import { loadFavorites, removeFavorite } from '../store/favorite.actions';

@Component({
  selector: 'app-favorite-list',
  imports: [],
  templateUrl: './favorite-list.component.html',
})
export class FavoriteListComponent implements OnInit {
  private readonly store = inject(Store);

  favorites = this.store.selectSignal(selectAllFavorites);

  ngOnInit(): void {
    this.store.dispatch(loadFavorites());
  }

  onRemove(id: number): void {
    this.store.dispatch(removeFavorite({ id }));
  }
}
