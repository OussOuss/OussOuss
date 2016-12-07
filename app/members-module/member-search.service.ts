import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Member } from './member';

@Injectable()
export class MemberSearchService {

    constructor(private http: Http) { }

    search(term: string): Observable<Member[]> {
        
        return this.http
            .get(`app/members/?name=${term}`)
            .map((r: Response) => r.json().data as Member[]);
    }
}
