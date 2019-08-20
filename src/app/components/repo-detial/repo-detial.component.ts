import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubRepo } from "../../models/GithubRepo";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'repo-detial',
  templateUrl: './repo-detial.component.html',
  styleUrls: ['./repo-detial.component.scss']
})
export class RepoDetialComponent implements OnInit, OnDestroy {


  constructor(private route: ActivatedRoute) {
    //get id from url
    const id = this.getRepoIdfromURL()
    //key of stored repo
    this.key = "repository[" + id.toString() + "]"
    //get stored repo
    this.repo = JSON.parse(localStorage.getItem(this.key))[0] as GithubRepo
  }
  key: string
  repo: GithubRepo
  ngOnInit() {
  }
  getRepoIdfromURL(): string {
    //get id from url
    return this.route.snapshot.paramMap.get("id").toString()
  }
  ngOnDestroy() {
    //remove stored repo on storage
    localStorage.removeItem(this.key)
  }

}
