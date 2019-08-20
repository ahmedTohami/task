import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchReposComponent } from './components/search-repos/search-repos.component';
import { RepoDetialComponent } from './components/repo-detial/repo-detial.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from "../app/reducers/Repos.Reducer";
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from "@ngrx/effects";
import { GithubReposEffects } from './effects/Repos.Effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SearchReposComponent,
    RepoDetialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule, 
    StoreModule.forRoot({
      GithubRepos: reducer
    }),
    EffectsModule.forRoot([GithubReposEffects]),
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
