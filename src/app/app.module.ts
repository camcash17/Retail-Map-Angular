import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResultsComponent } from './results/results.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { RouteComponent } from './route/route.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RetailService } from './retail.service';
import { FavoriteService } from './favorite.service';
import { AgmCoreModule } from '@agm/core';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    ResultsComponent,
    HeaderComponent,
    MapComponent,
    RouteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCuX4J4se2kKR-WCCYtrApC-OGIM5XWAo4'
    }),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'about',
        component: RouteComponent
      },
    ])
  ],
  providers: [
    RetailService,
    FavoriteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
