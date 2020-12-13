import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../authentication/login/login.component';
import { MoviesComponent} from '../layout/movies/movies.component'



const routes: Routes = [
 
  { path: '', component: LoginComponent },
   { path: 'movies', component: MoviesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



