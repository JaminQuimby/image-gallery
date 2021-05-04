import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, publishReplay, refCount, shareReplay } from 'rxjs/operators';
import { PexelsRequest } from './store/actions';

export interface Image {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: Image;
  liked: boolean;
}

export interface PexelsResponse {
  photos: Photo[];
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) { }

  public getAll(request: PexelsRequest): Observable<PexelsResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '563492ad6f91700001000001070fd28580f94f79b35dd70e356d281f' // todo: move to env or cfg settings.
      })
    };

    return this.http.get<PexelsResponse>(
      `https://api.pexels.com/v1/search?query=${request.query}&page=${request.page}&per_page=${request.limit}`, httpOptions
    ).pipe(
      publishReplay(1),
      refCount(),
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError(error => captureException(error))
    ) as Observable<PexelsResponse>;
  }
}

function captureException(error: any): any {
  throw new Error('Function not implemented.');
}
