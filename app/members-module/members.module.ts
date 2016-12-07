import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { RouterModule }        from '@angular/router';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MembersInMemoryDataService }  from './members-InMemoryDataService';

import { MemberService } from './member.service';
import { MembersComponent } from './members-component';
import { MemberDetailComponent } from './member-detail.component';
import { MemberSearchComponent } from './member-search.component';

@NgModule({
    imports: [
        CommonModule,
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
