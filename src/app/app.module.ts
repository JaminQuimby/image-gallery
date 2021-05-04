import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryComponent } from './gallery/gallery.component';

import { GalleryReducer } from './store/reducer';
import { GalleryEffects } from './store/effects';
import { LazyImageDirective } from './imageLazy.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SearchComponent } from './search/search.component';

import { ModalModule } from './modal/modal.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    GalleryListComponent,
    GalleryComponent,
    LazyImageDirective,
    SearchComponent,
  ],
  imports: [
    ModalModule,
    BrowserModule,
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ gallery: GalleryReducer }),
    EffectsModule.forRoot([GalleryEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
