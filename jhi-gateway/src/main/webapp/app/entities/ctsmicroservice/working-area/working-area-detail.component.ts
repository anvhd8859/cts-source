import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWorkingArea } from 'app/shared/model/ctsmicroservice/working-area.model';

@Component({
    selector: 'jhi-working-area-detail',
    templateUrl: './working-area-detail.component.html'
})
export class WorkingAreaDetailComponent implements OnInit {
    workingArea: IWorkingArea;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ workingArea }) => {
            this.workingArea = workingArea;
        });
    }

    previousState() {
        window.history.back();
    }
}
