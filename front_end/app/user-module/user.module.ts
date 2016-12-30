
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared-module/shared.module';

import { UserFormComponent } from './user-form.component';
import { UserRoutingModule } from './user-routing.module';
@NgModule({
    imports: [
        SharedModule,
        UserRoutingModule
    ],
    declarations: [
        UserFormComponent
    ]
})
export class UserModule { }
