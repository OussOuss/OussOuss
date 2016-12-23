import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
/* App Root */
import { AppComponent }   from './app.component';
/* Feature Modules */
import { MembersModule }    from '../members-module/members.module';
/* Routing Module */
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  imports: [
    BrowserModule,
    MembersModule,
    AppRoutingModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
