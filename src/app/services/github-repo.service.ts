import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GithubRepo } from "../models/GithubRepo";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubRepoService {

  constructor(private http: HttpClient) {

  }

  
  getRepos(queryString: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(queryString)
      .pipe(
        catchError((error: any) => Observable.throw(error))
      )
  }


}
