import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  moduleId: module.id,
  selector: 'member-detail',
  templateUrl: 'member-detail.component.html',
  styleUrls: ['member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {


  member: Member;

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.memberService.getMember(+params['id']))
      .subscribe(member => {this.member = member});
  }

  save(): void {
    this.memberService.update(this.member)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['members']);
  }

}
