import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { environment } from '../environments/environment';

@Injectable()
export class FavoriteService {
    sharingData: any = { data: " " };
    private headers = new Headers({'Content-Type': 'application/json'});
    private apiUrl = 'api/data';
    private env = environment.apiUrl;

    // Observable string source
    private dataStringSource = new BehaviorSubject<string>(null);
  
    // Observable string stream
    dataString$ = this.dataStringSource.asObservable();
  
    constructor(private http: Http) { }
  
    public saveFavData(value) {
      this.sharingData.data = value;
    //   console.log("fav save data function called " + value + " and " + this.sharingData.data);
      this.dataStringSource.next(this.sharingData.data);
    }

    getFavorites() {
        // console.log("fav service running");
        return this.http.get(`http://localhost:8080/retailers`)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    }

    addFavorite(results) {
        console.log("add favorite", results);
        // await this.http.post(this.env+`/retailers`, results);
        return this.http.post(`http://localhost:8080/retailers`, results);
    }

    deleteFavorite(results) {
            console.log("delete favorite", results);
            return this.http.delete(`http://localhost:8080/retailers/`+results);
    }

    updateFavorite(index) {
        console.log('Updated Favorite!', index);
        const retailerToUpdate = this.sharingData.data[index];
        // await axios.patch(`/retailers/${retailerToUpdate.id}`, retailerToUpdate);
        return this.http.patch(`http://localhost:8080/retailers/${retailerToUpdate.id}`, retailerToUpdate);
      };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}