import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { Photo } from '../image.service';
import { AppState } from '../store/reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public faBrain = faBrain;
  constructor() {  }

  public ngOnInit(): void {}
}
