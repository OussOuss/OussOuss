import { NgModule }            from '@angular/core';
import { Routes,RouterModule }        from '@angular/router';

import { MembersComponent }    from './members.component';
import { MemberDetailComponent }    from './member-detail.component';

const routes: Routes = [
  {path: 'members', component: MembersComponent,
  children: [
      { path: ':id', component: MemberDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule {}
