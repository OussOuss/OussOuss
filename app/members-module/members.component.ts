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
  //ce tableau nous permet de stocker la valeur des membres pour économiser les appels à la bdd
  membersFinal: Member[];
  selectedMember: Member;

  title = 'Tahiri\'s Family';

  constructor(private router: Router, private memberService: MemberService) {

  }

  ngOnInit(): void {
    this.memberService.getMembersHttp().then(members =>{ this.members = members; this.membersFinal = this.members;});
  }

  onSelect(member: Member): void {
    this.selectedMember = member;
  }

  updateMember() {
    this.router.navigate(['members', this.selectedMember.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.memberService.create(name)
      .then(member => {
        this.members.push(member);
        this.membersFinal.push(member);
        this.selectedMember = null;
      });
  }

  delete(member: Member): void {
    this.memberService
      .delete(member.id)
      .then(() => {
        this.members = this.members.filter(h => h !== member);
        this.membersFinal = this.membersFinal.filter(h => h !== member);
        if (this.selectedMember === member) { this.selectedMember = null; }
      });
  }

  getMembersSearch(name: string) {

    this.selectedMember = null;
    
    if (!name.trim() || 0 === name.trim().length) {
      this.members = this.membersFinal;
    }
    else {
      this.members = this.members.filter(member => member.name.toUpperCase().indexOf(name.toUpperCase()) !== -1);
    }
  }


}
