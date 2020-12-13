import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import{MoviesList,Movie} from 'src/app/models/movies.model';
import {AuthUtils} from 'src/app/utils/authutils';
import {MessageService} from 'src/app/services/message.service'
import {StaticVariables} from 'src/app/utils/staticvariables';
import {map, startWith} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {DialogboxComponent} from 'src/app/layout/dialogbox/dialogbox.component'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

    constructor(private router: Router,
      private movieservice: MovieService,
      private authUtils: AuthUtils,
      private messageService: MessageService,public dialog: MatDialog) { }

  data:Array<Movie>;
  data2: Array<Movie>;
  singlepagedata : MoviesList;
  page = 0;
  size = 10;
   heya =0 ;
   maxLength = 100;
   haspreviouspage =false;
   hasnextpage =false;
   pagenumber = null;
  showrefreshbutton = false ; 
  ngOnInit(): void {
    this.servicecall(null);

  
  }
  
  openDialog(movieobj) {
    this.movieservice.setcurrentmovie(movieobj);
    const dialogRef = this.dialog.open(DialogboxComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  


  getData(obj) {
    let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;
      
    this.data = this.data2.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });   
  }

   shorten(str,separator) {
    if (str.length <= 100) return str;
    return str.substring(0, str.lastIndexOf(separator, 100));
  }
 
servicecall(pagenumberfinal)
{
  
  this.movieservice.movies(this.authUtils.getCurrentUser(),pagenumberfinal).subscribe(resp => {
      
    //  console.log("this is the data2 "+resp.body.data);
    if (resp && resp.body && resp.body.is_success == true)
    this.singlepagedata = new MoviesList();
        this.singlepagedata = resp.body;
        console.log(this.singlepagedata);
        console.log(resp.body);
        console.log("singlepagedata previous"+ this.singlepagedata.next);
        this.data2 = this.singlepagedata.results;
        console.log("length of data 2 "+ this.data2.length);
         this.heya =  this.data2.length;

       
        
       
       if (resp.body.is_success === false) {
        this.messageService.errorsMessage(resp.body.error);
        this.messageService.errorMessage(resp.body.error.message); 
       console.log("here");

        this.showrefreshbutton = true;
        
      }
     console.log(this.data2);
      this.getData({pageIndex: this.page, pageSize: this.size});
      
      for (let i = 0; i < this.data.length; i++) {

          
          this.data[i].trimmeddescription = this.shorten(this.data[i].description,' ');
          
         if(this.singlepagedata.previous == "" )
         { 
           this.haspreviouspage = true;

         }
         else{
          this.haspreviouspage = false;
         }
         if(this.singlepagedata.next == "" )
         { 
           this.hasnextpage = true;

         }
         else{
          this.hasnextpage = false;
         }
          
      }
     
    });
  
}
loadnextpage()
{
  console.log("page number "+ this.singlepagedata.next.substring(this.singlepagedata.next.length - 1, this.singlepagedata.next.length));
  
  this.servicecall(this.singlepagedata.next.substring(this.singlepagedata.next.length - 1, this.singlepagedata.next.length));
  
}

loadpreviouspage()
{
  console.log("page number "+ this.singlepagedata.previous.substring(this.singlepagedata.previous.length - 1, this.singlepagedata.previous.length));
  if(this.singlepagedata.previous.substring(this.singlepagedata.previous.length - 1, this.singlepagedata.previous.length)== "/")
  {   console.log("entered in this condotion ");
    this.servicecall(null);
  }
  else{
  this.servicecall(this.singlepagedata.previous.substring(this.singlepagedata.previous.length - 1, this.singlepagedata.previous.length));
  }
}
onrefresh()
{
 var  temp = parseInt(this.singlepagedata.previous.substring(this.singlepagedata.previous.length - 1, this.singlepagedata.previous.length)) + 1;

  this.servicecall(temp.toString());
}
}

