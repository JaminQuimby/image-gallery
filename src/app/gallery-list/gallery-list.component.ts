import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChangeDetectorRef } from '@angular/core';
import { GetItems, PexelsRequest } from '../store/actions';
import { Photo } from '../image.service';
import { ModalService } from '../modal/modal.service';
import { AppState } from '../store/reducer';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {
  constructor(
    private store: Store<{ gallery: AppState }>,
    public modalService: ModalService,
    private cdr: ChangeDetectorRef
  ) { }
  @Input() images: Photo[] = [];
  public throttle = 0;
  public scrollDistance = 0.3;
  private request: PexelsRequest;
  public ngOnInit(): void {
    this.store.pipe(
      select('gallery'))
      .subscribe({
        next: (data: any) => {
          this.request = { limit: data.limit, page: data.page, query: data.query };
        }
      });
  }
  public onScrollEnd(): void {
    this.request.page += 1;
    if (this.request.page <= 5) {
      this.store.dispatch(new GetItems(this.request));
      this.cdr.markForCheck();
    }
  }

}
