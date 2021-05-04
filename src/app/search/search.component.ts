import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { ClearItems, GetItems, PexelsRequest } from '../store/actions';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppState } from '../store/reducer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  public faSearch = faSearch;
  public searchForm: FormGroup;
  public query: FormControl;
  private request: PexelsRequest;
  constructor(private store: Store<{gallery: AppState}>, private cdr: ChangeDetectorRef) {  }
  ngOnInit(): void {
    this.store.pipe(select('gallery'))
    .subscribe({next: (data: any) => {
      this.request = {limit: data.limit, page: data.page, query: data.query};
    }});

    this.query = new FormControl();
    this.searchForm = new FormGroup({
      query: this.query
    });

    this.searchForm.get('query').valueChanges
    .pipe(
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe(query => this.search(query));
  }
  public search(term: string): void {
    this.store.dispatch(new ClearItems());
    this.request.query = term;
    this.store.dispatch(new GetItems(this.request));
    this.cdr.markForCheck();
  }

}
