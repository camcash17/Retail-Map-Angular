import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class RetailService {

    sharingData = { data: " " };
    private headers = new Headers({'Content-Type': 'application/json'});
    private apiUrl = 'api/data';

    // Observable string source
    private dataStringSource = new BehaviorSubject<string>(null);
  
    // Observable string stream
    dataString$ = this.dataStringSource.asObservable();
  
    constructor(private http: Http) { }
  
    public saveData(value){
      this.sharingData.data = value;
    //   console.log("save data function called " + value + " and " + this.sharingData.data);
      this.dataStringSource.next(this.sharingData.data);
    }

    createAPIObservable(results){
        // console.log("service running", results);
        // return this.http.get(`https://data.cityofnewyork.us/resource/uyz2-yxi9.json?$q=`+results);
        return this.http.get(`https://data.cityofnewyork.us/resource/uyz2-yxi9.json?$q=`+results)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}