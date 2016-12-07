import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Member } from './member';
import { MEMBERS } from './mock-members';

@Injectable()
export class MemberService {

    private membersUrl = 'app/members';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getMember(id: number): Promise<Member> {
        return this.getMembers()
            .then(members => members.find(member => member.id === id));
    }

    getMembers(): Promise<Member[]> {
        return Promise.resolve(MEMBERS);
    }

    getMembersHttp(): Promise<Member[]> {
        return this.http.get(this.membersUrl)
            .toPromise()
            .then(response => response.json().data as Member[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getMembersSlowly(): Promise<Member[]> {
        return new Promise<Member[]>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() => this.getMembers());
    }

    update(member: Member): Promise<Member> {
        const url = `${this.membersUrl}/${member.id}`;
        return this.http
            .put(url, JSON.stringify(member), { headers: this.headers })
            .toPromise()
            .then(() => member)
            .catch(this.handleError);
    }

    create(name: string): Promise<Member> {
        return this.http
            .post(this.membersUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.membersUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

}
