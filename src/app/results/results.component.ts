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

  constructor(private retailService: RetailService) { }


  onOptionsSelected(event) {
    this.searchSubject.next(event);
    this.retailService.saveData(event);
  }

  ngOnInit() {
    this.searchSubject.subscribe(results => {
      this.retailService.createAPIObservable(results)
      .then(data => {
        // console.log(data)
        this.item = data;
        // .subscribe(response => this.item = response.json())
        // console.log('brand new', this.item)
      })
      // .subscribe(response => this.selected = response.json());
      // this.mapComponent.getMap();
    })
  }

}
