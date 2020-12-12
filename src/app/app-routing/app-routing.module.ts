import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../authentication/login/login.component';
import { MoviesComponent} from '../layout/movies/movies.component'

// const routes: Routes = [];

const routes: Routes = [
  // { path: '', loadChildren: () => import('../layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
   { path: 'movies', component: MoviesComponent },
  // {
  //   path: 'change-password/:username',
  //   component: ChangePasswordComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



