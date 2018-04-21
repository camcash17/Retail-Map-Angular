import { Component, OnInit } from '@angular/core';
import { RetailService } from '../retail.service';
import { ResultsComponent } from '../results/results.component';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title: string = 'Google Maps';
  zoom: number = 15;
  lat: number = 40.7128;
  lng: number = -74.0060;
  item: any;
  favs: any;
  mapData: any;
  favMapData: any;
  coords: any;
  favCoords: any;
  newCoords: any;

  constructor(private retailService: RetailService, private favoriteService: FavoriteService) {

    this.retailService.dataString$.subscribe(
      data => {
        if(this.mapData !== data){
          this.mapData = data;
          this.getServersData(this.mapData)
          // console.log('my name', this.mapData)
        }
      })

      this.favoriteService.dataString$.subscribe(
        data => {
          if(this.favMapData !== data){
            this.favMapData = data;
            this.getFavServersData(this.favMapData)
            // console.log('my name', this.favMapData)
          }
      })

    }

   getServersData(name) {
      // console.log('server data', name)
      this.retailService
      .createAPIObservable(name)
      .then(data => {
        // console.log(data)
        this.item = data;
        // .subscribe(response => this.item = response.json())
        this.coords = data.map((retailers, index) => {
          // if(retailers.latitude && retailers.longitude) {
            return ({
              lat: +retailers.latitude,
              lng: +retailers.longitude,
              name: retailers.cnbio_org_name
            })
        })
        // console.log('first coords', this.coords)
        this.newCoords = this.coords.filter((item, index) => {
          if (!isNaN(item.lat)) {
            return({
              lat: item.lat,
              lng: item.lng,
              name: item.cnbio_org_name
            })
          }
        })
        // console.log('new coords', this.newCoords)
      })
  }

  getFavServersData(name) {
    // console.log('server data', name)
    this.favoriteService
    .getFavorites()
    .then(data => {
      // console.log(data)
      this.favs = data;
      // .subscribe(response => this.item = response.json())
      this.favCoords = data.map((retailers, index) => {
        // if(retailers.latitude && retailers.longitude) {
          return ({
            lat: +retailers.lat,
            lng: +retailers.lon,
            name: retailers.orgName
          })
      })
  })
}


  ngOnInit() {
  }

}
