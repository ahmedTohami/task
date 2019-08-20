import { GithubRepoState } from "./reducers/Repos.Reducer"
import { createSelector , createFeatureSelector } from "@ngrx/store";
import { getRepos , getReposLoading , getReposLoaded } from "./reducers/Repos.Reducer";

//============== section 1 =============
//============== state =============
export interface AppState {
    readonly GithubReposState: GithubRepoState;
}


//============== section 2 =============
//=========== selectors ===========================
export const getReposState = createFeatureSelector<GithubRepoState>("GithubRepos")  //same as property name in app module
export const getGihtubRepos = createSelector(getReposState, getRepos) 
export const getGihtubReposLoaded = createSelector(getReposState, getReposLoaded)  
export const getGihtubReposLoadeding = createSelector(getReposState, getReposLoading)  
