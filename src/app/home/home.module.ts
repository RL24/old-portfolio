import {NgModule} from '@angular/core';
import {UtilityModule} from '../util/utility.module';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {ContainerComponent} from './container/container.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [{
    path: '',
    component: ContainerComponent
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    UtilityModule
  ],
  declarations: [HomeComponent, ContainerComponent]
})
export class HomeModule {
}
