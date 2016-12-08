import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }       from '@angular/core';
import { CommonModule }      from '@angular/common';
import { UserService }       from './user.service';

@NgModule({
  imports:      [ CommonModule ],
  providers:    [ UserService ]
})
export class CoreModule {
}
