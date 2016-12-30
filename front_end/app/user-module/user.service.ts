import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class UserService {

    private userUrl = 'http://localhost:8000/user';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getUser(id: number): Observable<User> {
        return this.http.get(this.userUrl + "/" + id).
            map(response => response.json() as User).catch(this.handleError);
    }




    update(user: User): Observable<User> {
        const url = `${this.userUrl}/${user.userId}`;
        return this.http
            .put(url, JSON.stringify(user), { headers: this.headers })
            .map(() => user)
            .catch(this.handleError);
    }

    create(user: User): Observable<User> {
        return this.http
            .post(this.userUrl, JSON.stringify(user), { headers: this.headers })
            .map(response => response.json() as User)
            .catch(this.handleError);
    }

    delete(id: number): Observable<void> {
        const url = `${this.userUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .map(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
