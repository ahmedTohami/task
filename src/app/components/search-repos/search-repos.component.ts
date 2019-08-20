import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from "@angular/forms";
import { Store } from '@ngrx/store';
import { GithubRepo } from '../../models/GithubRepo';
import { AppState } from '../../app.AppState';
import { getGihtubRepos } from "../../../app/app.AppState";
import * as GithubRepoActions from "../../actions/Repos.Actions";
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject, fromEvent, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';


/** Error when invalid control is dirty, touched, or submitted. */
export class SearchErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'search-repos',
  templateUrl: './search-repos.component.html',
  styleUrls: ['./search-repos.component.scss']
})

export class SearchReposComponent implements OnInit, AfterViewInit, OnDestroy {

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  repos: GithubRepo[]
  matcher = new SearchErrorStateMatcher();
  searchTextChanged = new Subject<string>();
  keyupSubscription: Subscription
  loading: boolean

  @ViewChild('name', { static: false }) nameInputRef: ElementRef;

  constructor(private store: Store<AppState>) { }

  ngAfterViewInit() {

    this.keyupSubscription =
      fromEvent(this.nameInputRef.nativeElement, 'keyup')
        .pipe(
          debounceTime(1000), //wait for 1 second till user type
          map((event: Event) => (<HTMLInputElement>event.target).value), //get value 
          distinctUntilChanged(), //take only distinct values of stream 
          tap(() => {
            //load spinner
            this.loading = true
          }),
          tap(value => {
            if (value != "") {
              let queryString = this.formQueryString(value.split(" "))
              console.log("call api with " + queryString)
              //request from server 
              this.store.dispatch(new GithubRepoActions.LoadGithubRepo(queryString))
            }
          }),
        )
        .subscribe((data) => {
          console.log(data)
        })

  }

  ngOnDestroy() {
    //remove listener from keyup event
    this.keyupSubscription.unsubscribe()
  }

  ngOnInit() {
    this.store.select(getGihtubRepos).subscribe(
      ((payload: any) => {
        //stop spinner
        this.loading = false
        //reset repos 
        this.repos = payload.items as GithubRepo[]
      }),
      ((error: any) => console.log(error)),
      () => console.log("completed")
    )
  }

  onClick(id: string) {
    localStorage.setItem("repository["+id.toString()+"]", JSON.stringify(this.repos.filter(r => r.id == id)))
  }

  formQueryString(words: string[]): string {
    //if user typing 'github octocat'
    //query string should look like  https://api.github.com/search/repositories?q=github+octocat+in:name
    let queryString: string = "https://api.github.com/search/repositories?q="
    words.forEach(word => {
      queryString += word.toString() + "+"
    });
    queryString += "in:name"
    return queryString
  }


}
