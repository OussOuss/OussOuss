import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Member } from './member';

@Injectable()
export class MemberService {

    private membersUrl = 'http://localhost:8000/members';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getMember(id: number): Observable<Member> {
        return this.http.get(this.membersUrl + "/" + id).
            map(response => response.json() as Member).catch(this.handleError);
    }

    getMembersHttp(): Observable<Member[]> {
        return this.http.get(this.membersUrl).
            map(response => response.json() as Member[]).catch(this.handleError);
    }



    update(member: Member): Observable<Member> {
        const url = `${this.membersUrl}/${member.memberId}`;
        return this.http
            .put(url, JSON.stringify(member), { headers: this.headers })
            .map(() => member)
            .catch(this.handleError);
    }

    create(name: string): Observable<Member> {
        return this.http
            .post(this.membersUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .map(response => response.json() as Member)
            .catch(this.handleError);
    }

    delete(id: number): Observable<void> {
        const url = `${this.membersUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .map(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
