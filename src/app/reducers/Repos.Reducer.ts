import { GithubRepo } from "../models/GithubRepo";
import * as GithubReposActions from "../actions/Repos.Actions";

//section 1
//=================== state interface ===================
export interface GithubRepoState {
    data: GithubRepo[],
    loaded: boolean,
    loading: boolean
}

//section 2 
//===================initial state===================
const initialState: GithubRepoState = {
    data: [],
    loaded: false,
    loading: false
}

//section 3
//===================reducer===================
export function reducer(state: GithubRepoState = initialState, action: GithubReposActions.Actions): GithubRepoState {
    switch (action.type) {
        case GithubReposActions.LOAD_GITHUB_REPO: {
            console.log("loading")
            return {
                ...state,
                loading: true
            }
        }

        case GithubReposActions.LOADING_GITHUB_REPO_SUCCESS: {
            console.log("action succeeded")
            const data = action.payload
            return {
                ...state,
                loaded: true,
                loading: false,
                data
            }
        }

        case GithubReposActions.LOADING_GITHUB_REPO_FAILED: {
            console.log("action failed")

            return {
                ...state,
                loading: false,
                loaded: false
            }
        }

        default: {
            return state;
        }

    }
}

//============ selectors ============================
export const getReposLoading = (state: GithubRepoState) => state.loading
export const getReposLoaded = (state: GithubRepoState) => state.loaded
export const getRepos = (state: GithubRepoState) => state.data