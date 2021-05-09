import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IReceiptImage } from 'app/shared/model/ctsmicroservice/receipt-image.model';

@Component({
    selector: 'jhi-receipt-image-modal',
    templateUrl: './receipt-image-modal.component.html'
})
export class ReceiptImageModalComponent {
    image: IReceiptImage;
    mySrc: any;

    constructor(public modal: NgbActiveModal, private sanitizer: DomSanitizer) {}

    public myFunction(): any {
        this.mySrc = this.sanitizer.bypassSecurityTrustUrl('data:' + this.image.imageContentType + ';base64,' + this.image.image);
        return this.mySrc;
        // return this.image.image;
    }
}
