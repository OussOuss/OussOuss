import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MemberSearchService } from './member-search.service';
import { Member } from './member';
@Component({
    moduleId: module.id,
    selector: 'member-search',
    templateUrl: 'member-search.component.html',
    styleUrls: ['member-search.component.css'],
    providers: [MemberSearchService]
})
export class MemberSearchComponent implements OnInit {

    members: Observable<Member[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private memberSearchService: MemberSearchService,
        private router: Router) { }

    // Push a search term into the observable stream.
    search(term: string): void {
        
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.members = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.memberSearchService.search(term)
                // or the observable of empty memberes if no search term
                : Observable.of<Member[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<Member[]>([]);
            });
    }

    gotoDetail(member: Member): void {
        let link = ['/detail', member.id];
        this.router.navigate(link);
    }
}
