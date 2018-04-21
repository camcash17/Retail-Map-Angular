import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { RetailService } from '../retail.service';
import * as $ from 'jquery';

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

  viewFavorites() {
    $('#selectId').val('undefined')
    // document.getElementById('selectId').value = "undefined";
    this.searchSubject.next(null);
    this.retailService.saveData(null);
  }

  ngOnInit() {
  }

}
