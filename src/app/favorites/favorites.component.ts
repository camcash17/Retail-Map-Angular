import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favData: any;
  favs: any;

  constructor(private favoriteService: FavoriteService) {
    this.favoriteService.dataString$.subscribe(
      data => {
        if(this.favData !== data){
          // console.log('in fav constructor')
          this.favData = data;
          this.getServersData()
        }
      })
   }

   getServersData() {
    this.favoriteService
    .getFavorites()
    .then(data => {
      // console.log('fav itemzzz', data)
      this.favs = data;
      // .subscribe(response => this.item = response.json())
      // this.favoriteService.saveFavData(this.favs)
    })
  }

  onDelete(destroy) {
    console.log('destroy', destroy)
    this.favoriteService.deleteFavorite(destroy)
      .subscribe((destroy) => this.getServersData());
  }

  handleFavoriteChange = (event, index) => {
    // console.log('event name', event, index)
    const attributeToChange = "orgName";
    const newValue = event;

    const updatedFavoritesList = [...this.favs];
    const retailerToUpdate = updatedFavoritesList[index];
    retailerToUpdate[attributeToChange] = newValue;

    this.favs = updatedFavoritesList;
  };

  updateFavorite(index) {
    this.favoriteService.saveFavData(this.favs)
    this.favoriteService.updateFavorite(index)
    .subscribe((results) => this.getServersData());
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  ngOnInit() {
  }

}
