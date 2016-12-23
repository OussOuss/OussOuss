import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

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
        MembersRoutingModule
    ],
    declarations: [
        MembersComponent,
        MemberDetailComponent
    ],
    providers: [MemberService]
})
export class MembersModule { }
