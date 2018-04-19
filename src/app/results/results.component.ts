import { Component, OnInit } from '@angular/core';
import { RetailService } from '../retail.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  selected: any;
  item: any;
  searchSubject = new Subject();
  mapData: any;

  constructor(private retailService: RetailService) { 
    this.retailService.dataString$.subscribe(
      data => {
        if(this.mapData !== data){
          this.mapData = data;
          this.getServersData(this.mapData)
          console.log('my name2', this.mapData)
        }
      })
    }

  getServersData(name) {
    console.log('server data2', name)
    this.retailService
    .createAPIObservable(name)
    .then(data => {
      console.log('itemzzz', data)
      this.item = data;
      // .subscribe(response => this.item = response.json())
    })
  }

  ngOnInit() {
  }

}
