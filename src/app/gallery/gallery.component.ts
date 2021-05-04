import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Photo } from '../image.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalService } from '../modal/modal.service';
import { AppState } from '../store/reducer';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private modalService: ModalService
    ) { }


  @Input() gallery: Photo;

  public sanitize(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  public openModal(signature: string, photo: Photo): void {
    this.modalService.open(signature, photo);
  }
  public ngOnInit(): void { }
}
