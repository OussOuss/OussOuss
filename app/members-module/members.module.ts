import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MembersInMemoryDataService } from './members-InMemoryDataService';

import { MemberService } from './member.service';
import { MembersComponent } from './members.component';
import { MemberDetailComponent } from './member-detail.component';
import { MembersRoutingModule } from './members-routing.module';

import { SharedModule } from '../shared-module/shared.module';


@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        HttpModule,
        MembersRoutingModule,
        InMemoryWebApiModule.forRoot(MembersInMemoryDataService),
    ],
    declarations: [
        MembersComponent,
        MemberDetailComponent
    ],
    providers: [MemberService]
})
export class MembersModule { }
