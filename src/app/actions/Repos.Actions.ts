import { Action } from "@ngrx/store";
import { GithubRepo } from "../models/GithubRepo";


//============== types ===============================
export const LOAD_GITHUB_REPO = '[GithubRepo] Load Github Repo';
export const LOADING_GITHUB_REPO_SUCCESS = '[GithubRepo] Loading Github Repo Success';
export const LOADING_GITHUB_REPO_FAILED = '[GithubRepo] Loading Github Repo Failed';

//============= actions ===================
export class LoadGithubRepo implements Action {
    readonly type = LOAD_GITHUB_REPO;
    constructor(public queryString:string){}
}

export class LoadingGithubRepoSuccess implements Action {
    readonly type = LOADING_GITHUB_REPO_SUCCESS;

    constructor(public payload:GithubRepo[]){}

}

export class LoadingGithubRepoFailed implements Action {
    readonly type = LOADING_GITHUB_REPO_FAILED;

    constructor(public payload:any){}

}

export type Actions =  LoadGithubRepo | LoadingGithubRepoSuccess | LoadingGithubRepoFailed 




