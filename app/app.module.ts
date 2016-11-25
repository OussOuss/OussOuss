import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http'
import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { MemberService } from './member.service';
import { AppComponent } from './app.component';
import { MembersComponent } from './members-component';
import { MemberDetailComponent } from './member-detail.component';
import { DashboardComponent } from './dashboard.component';
import { MemberSearchComponent } from './member-search.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        MembersComponent,
        MemberDetailComponent,
        DashboardComponent,
        MemberSearchComponent
    ],
    providers: [MemberService],
    bootstrap: [AppComponent]
})
export class AppModule { }
