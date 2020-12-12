export class MoviesList {
    count :number;
    next: string;
    previous:string;
    results: Array<Movie> ;
   
}


export class Movie{
    title : string;
    description : string ; 
    genres : string ; 
    uuid:any;

}


