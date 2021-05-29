import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    policy: any = false;
    url: any;

    constructor(private router: Router) {
        this.router.events.subscribe(value => {
            this.url = router.url.toString();
            if (this.url === '/policy') {
                this.policy = true;
            }
        });
    }
}
