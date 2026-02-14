import { Component, inject } from '@angular/core';
import { FavoriteListComponent } from '../../favorite-list/favorite-list.component';
import { Store } from '@ngrx/store';
import { selectFavoritesLoading } from '../../store/favorite.selectors';
import { selectAllFavorites } from '../../store/favorite.selectors';


@Component({
  selector: 'app-favorite-list-page',
  imports: [FavoriteListComponent],
  templateUrl: './favorite-list-page.component.html',
})
export class FavoriteListPageComponent {

  private store = inject(Store);
  
  loading = this.store.selectSignal(selectFavoritesLoading);

  
  
  
  
 

  


}
