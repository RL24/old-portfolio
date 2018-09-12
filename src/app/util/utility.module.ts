import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MdcAppBarModule,
  MdcButtonModule,
  MdcCardModule,
  MdcCheckboxModule,
  MdcChipsModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcGridListModule,
  MdcIconButtonModule,
  MdcIconModule,
  MdcImageListModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcRippleModule,
  MdcSelectModule,
  MdcShapeModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabBarModule,
  MdcTextFieldModule,
  MdcThemeModule,
  MdcTypographyModule
} from '@angular-mdc/web';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

const modules = [
  CommonModule,

  MdcAppBarModule,
  MdcButtonModule,
  MdcCardModule,
  MdcCheckboxModule,
  MdcChipsModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcGridListModule,
  MdcIconModule,
  MdcIconButtonModule,
  MdcImageListModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcRippleModule,
  MdcSelectModule,
  MdcShapeModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabBarModule,
  MdcTextFieldModule,
  MdcThemeModule,
  MdcTypographyModule,

  HttpClientModule,
  ReactiveFormsModule,

  FlexLayoutModule
];

@NgModule({
  exports: [
    ...modules
  ]
})
export class UtilityModule {
}
