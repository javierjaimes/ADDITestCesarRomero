import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';



const routes: Routes = [
  { path: 'home', component: ListComponent },
  { path: 'lead/:id', component: UserDetailComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
