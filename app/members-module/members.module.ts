import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { FormsModule }        from '@angular/forms';

import { RouterModule }        from '@angular/router';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MembersInMemoryDataService }  from './members-InMemoryDataService';

import { MemberService } from './member.service';
import { MembersComponent } from './members.component';
import { MemberDetailComponent } from './member-detail.component';
import { MemberSearchComponent } from './member-search.component';

import { SharedModule }       from '../shared-module/shared.module';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(MembersInMemoryDataService),
    ],
    declarations: [
        MembersComponent,
        MemberDetailComponent,
        MemberSearchComponent
    ],
    providers: [MemberService]
})
export class MembersModule { }
