import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionTypes, PexelsRequest } from './actions';
import { ImageService } from '../image.service';

@Injectable()
export class GalleryEffects {
  constructor(
    private actions$: Actions,
    private imageService: ImageService
  ) { }

  public loadImage$ = createEffect(() => this.actions$.pipe(
    ofType(ActionTypes.LoadItems),
    mergeMap(({ payload: { page, limit, query } }: {'payload': PexelsRequest}) => {
      return this.imageService.getAll({ page, limit, query })
        .pipe(
          map((data) => {
            return { type: ActionTypes.LoadSuccess, payload: data.photos, query };
          }),
          catchError(() => EMPTY)
        );
    })
  ));

}
