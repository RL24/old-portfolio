import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {UtilityModule} from './util/utility.module';

const routes: Routes = [{
  path: '',
  loadChildren: './home#HomeModule'
}, {
  path: '**',
  redirectTo: ''
}];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    RouterModule.forRoot(routes),

    UtilityModule,

    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {
}
