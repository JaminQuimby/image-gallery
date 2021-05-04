import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Photo } from '../image.service';
import { AppState } from '../store/reducer';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<{gallery: AppState}>, private cdr: ChangeDetectorRef) {
    this.store.pipe(
      select('gallery'))
      .subscribe({next: (data: any) => {this.items = data.items; this.cdr.markForCheck(); }}
      );
  }

  items: Photo[] = [];

  public ngOnInit(): void {  }
}
