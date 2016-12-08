import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  moduleId: module.id,
  selector: 'tahiri-members',
  templateUrl: 'members.component.html',
  styleUrls: ['members.component.css'],
  providers: [MemberService]
})
export class MembersComponent implements OnInit {
  members: Member[];
  selectedMember: Member;

  title = 'Tahiri\'s Family';

  constructor(private router: Router, private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.memberService.getMembersHttp().then(members => this.members = members);
  }

  onSelect(member: Member): void {
    console.log("je suis la "+this.selectedMember.id);
    this.selectedMember = member;
    this.router.navigate(['members', this.selectedMember.id]);
  }


  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.memberService.create(name)
      .then(member => {
        this.members.push(member);
        this.selectedMember = null;
      });
  }

  delete(member: Member): void {
    this.memberService
      .delete(member.id)
      .then(() => {
        this.members = this.members.filter(h => h !== member);
        if (this.selectedMember === member) { this.selectedMember = null; }
      });
  }

}
