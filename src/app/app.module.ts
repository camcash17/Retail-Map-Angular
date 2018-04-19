import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { RouteComponent } from './route/route.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RetailService } from './retail.service';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    ResultsComponent,
    HeaderComponent,
    MapComponent,
    RouteComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCuX4J4se2kKR-WCCYtrApC-OGIM5XWAo4'
    })
  ],
  providers: [
    RetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
