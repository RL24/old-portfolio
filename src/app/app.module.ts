import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { PaladinsComponent } from './paladins/paladins.component';
import { HomeComponent } from './home/home.component';
import { SteamComponent } from './steam/steam.component';
import { SafePipe } from './pipe/safe.pipe';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'paladins',
  component: PaladinsComponent
}, {
  path: 'steam',
  component: SteamComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    PaladinsComponent,
    SteamComponent,
    HomeComponent,

    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
