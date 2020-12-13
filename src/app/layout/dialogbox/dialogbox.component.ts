import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import{MoviesList,Movie} from 'src/app/models/movies.model';
import {AuthUtils} from 'src/app/utils/authutils';
import {MessageService} from 'src/app/services/message.service'
import {StaticVariables} from 'src/app/utils/staticvariables';




@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

  constructor(private movieservice: MovieService,
    private authUtils: AuthUtils,
    private messageService: MessageService) { }
    CurrentMovie: Movie;

  ngOnInit(): void {
 
          this.CurrentMovie = new Movie();

          this.CurrentMovie = this.movieservice.getcurrentmovie();

        console.log("from dialogbox" + this.movieservice.getcurrentmovie());

  }

}


