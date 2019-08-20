import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchReposComponent } from './components/search-repos/search-repos.component';
import { RepoDetialComponent } from './components/repo-detial/repo-detial.component';

const routes: Routes = [
  { path: '', component: SearchReposComponent },
  { path: 'repos/:id', component: RepoDetialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
