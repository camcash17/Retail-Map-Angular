import { Component, OnInit } from '@angular/core';
import { RetailService } from '../retail.service';
import { Subject } from 'rxjs/Subject';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  selected: any;
  item: any;
  newItem: any;
  searchSubject = new Subject();
  mapData: any;
  favs: any;
  newFav: any = {};
  favData: any;

  constructor(private retailService: RetailService,
              private favoriteService: FavoriteService) { 
    this.retailService.dataString$.subscribe(
      data => {
        if(this.mapData !== data){
          this.mapData = data;
          this.getServersData(this.mapData)
          // console.log('my name2', this.mapData)
        }
      })
    }

  getServersData(name) {
    // console.log('server data2', name)
    this.retailService
    .createAPIObservable(name)
    .then(data => {
      // console.log('results itemzzz', data)
      this.item = data;
      // .subscribe(response => this.item = response.json())
      // console.log('item', this.item)
      this.newItem = this.item.filter((item, index) => {
        if (item.latitude) {
          return({
            orgName: item.cnbio_org_name,
            primaryName: item.primary,
            secondaryName: item.secondary,
            lat: item.lat,
            lon: item.lng,
          })
        }
      })
      // console.log('new coords', this.newItem)
    })
  }

  getFavServersData() {
    this.favoriteService
    .getFavorites()
    .then(data => {
      // console.log('getFavData', data)
      this.favData = data;
      // .subscribe(response => this.item = response.json())
    })
  }

  onFavorite(event) {
    this.favoriteService.saveFavData(null);
    this.newFav = {
      orgName: event.cnbio_org_name, 
      primaryName: event.primary,
      secondaryName: event.secondary,
      lat: event.latitude,
      lon: event.longitude
    };
    this.favoriteService.addFavorite(this.newFav)
    .subscribe((results) => this.favoriteService.saveFavData(this.favData));
  }

  ngOnInit() {
  }

}
