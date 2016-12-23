import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    template: `<h1>Je suis dans la page pictures</h1>
               <router-outlet></router-outlet>
               `
})
export class PicturesComponent {
}
