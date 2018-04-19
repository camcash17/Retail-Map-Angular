import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { RetailService } from '../retail.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  selection: any;
  searchSubject = new Subject();
  item: any;

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
    })
  }

}
