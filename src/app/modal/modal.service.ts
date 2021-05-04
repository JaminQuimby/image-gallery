import { Injectable } from '@angular/core';
import { Photo } from '../image.service';
import { ModalComponent } from './modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: ModalComponent[] = [];

    public add(modal: ModalComponent): void {
        // add modal to array of active modals
        this.modals.push(modal);
    }

    public remove(signature: string): void {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.signature !== signature);
    }

    public open(signature: string, content: Photo): void {
        // open modal specified by id
        const modal = this.modals.find(x => x.signature === signature);
        modal.content = content;
        modal.open();
    }

    public close(signature: string): void {
        // close modal specified by id
        const modal = this.modals.find(x => x.signature === signature);
        modal.close();
    }
}
