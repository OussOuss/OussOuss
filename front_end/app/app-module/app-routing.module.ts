import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: 'members', pathMatch: 'full'},
    { path: 'pictures', loadChildren: 'app/pictures-module/pictures.module#PicturesModule' },
    { path: 'user', loadChildren: 'app/user-module/user.module#UserModule' }

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
