import { ChangeDetectorRef } from '@angular/core';
import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Photo } from '../image.service';

import { ModalService } from './modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() signature: string;
    public content: Photo;
    public get photographer(): string { return this.content?.photographer; }
    public get image(): string { return this.content?.src?.large2x; }
    private element: any;

    constructor(
        private modalService: ModalService,
        private el: ElementRef,
        private cdr: ChangeDetectorRef
    ) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        if (!this.signature) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', el => {
            if (el.target.className === 'app-modal') {
                this.close();
            }
        });

        // add self to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.signature);
        this.element.remove();
    }

    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('app-modal-open');
        this.cdr.markForCheck();
    }

    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('app-modal-open');
    }

    public closeModal(signature: string): void {
        this.modalService.close(signature);
    }
}
