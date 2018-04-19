import { Component, OnInit } from '@angular/core';
import { RetailService } from '../retail.service';
import { ResultsComponent } from '../results/results.component';

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
  mapData: any;
  coords: any;
  newCoords: any;

  constructor(private retailService: RetailService) {

    this.retailService.dataString$.subscribe(
      data => {
        if(this.mapData !== data){
          this.mapData = data;
          this.getServersData(this.mapData)
          console.log('my name', this.mapData)
        }
      })
    }

   getServersData(name) {
      console.log('server data', name)
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
        console.log('first coords', this.coords)
      //   this.newCoords = this.coords.map((item, index) => {
      //     if (item.lat !== 'NaN') {
      //       return({
      //         lat: item.lat,
      //         lng: item.lng
      //       })
      //     }
      //   })
      //   console.log('coords', this.newCoords)
      // })
    })
  }


  ngOnInit() {
  }

}
