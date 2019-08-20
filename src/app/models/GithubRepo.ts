//==================== represents data of response ==================
export interface GithubRepo {
    id:string
    name:string,
    full_name: string,
    owner: any,
    description:string,
    stargazers_count:string,
    forks_count:string,
    language:string,
    size:number,
}