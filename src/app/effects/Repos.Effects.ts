import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as GithubRepoActions from "../actions/Repos.Actions";
import { switchMap, map, catchError } from 'rxjs/operators';
import { GithubRepoService } from "../services/github-repo.service";
import { of } from 'rxjs';


@Injectable()
export class GithubReposEffects {
    constructor(private actions$: Actions, private githubRepoService: GithubRepoService) {
    }

    @Effect()
    loadGithubRepos$ = this.actions$.pipe(
        ofType(GithubRepoActions.LOAD_GITHUB_REPO)).pipe(
            switchMap((action:GithubRepoActions.LoadGithubRepo) => {
                return this.githubRepoService.getRepos(action.queryString).pipe(
                    //loading success 
                    map((repos => new GithubRepoActions.LoadingGithubRepoSuccess(repos))),
                    //loading failed 
                    catchError(error => of(new GithubRepoActions.LoadingGithubRepoFailed(error)))
                )
            })
        )
}