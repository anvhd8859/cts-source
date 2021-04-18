import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, Principal } from 'app/core';

import { IReceiptnote } from 'app/shared/model/ctsmicroservice/receiptnote.model';

@Component({
    selector: 'jhi-receiptnote-detail',
    templateUrl: './receiptnote-detail.component.html'
})
export class ReceiptnoteDetailComponent implements OnInit {
    receiptnote: IReceiptnote;
    currentUser: IUser;

    constructor(private activatedRoute: ActivatedRoute, private principal: Principal, private router: Router) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentUser = account;
        });
        this.activatedRoute.data.subscribe(({ receiptnote }) => {
            this.receiptnote = receiptnote;
        });
    }

    previousState() {
        const condition = this.currentUser.authorities.find(e => e === 'ROLE_ADMIN');
        if (condition) {
            this.router.navigate(['/invoice-header']);
        } else {
            window.history.back();
        }
    }
}
