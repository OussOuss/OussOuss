import { Component } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
@Component({
    moduleId: module.id,
    templateUrl: 'user-form.component.html',
    styleUrls: ['user-form.component.css'],
    providers: [UserService]
})
export class UserFormComponent {
    submitted = false;
    user = new User(2, '', '', '');

    constructor(private userService: UserService) {

    }
    onSubmit() {
      this.userService.create(this.user).subscribe();
      this.submitted = true;
 }

}
