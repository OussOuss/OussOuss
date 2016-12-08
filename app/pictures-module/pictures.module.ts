
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared-module/shared.module';

import { PicturesComponent } from './pictures.component';
import { PicturesRoutingModule } from './pictures-routing.module';
@NgModule({
    imports: [
        SharedModule,
        PicturesRoutingModule
    ],
    declarations: [
        PicturesComponent
    ]
})
export class PicturesModule { }
