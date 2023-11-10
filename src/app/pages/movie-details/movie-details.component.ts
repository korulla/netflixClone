import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  a:string = "https://www.youtube.com/embed/"
  c: string | undefined;
  killadi(): string {
    return this.a + this.getMovieVideoResult;
  }

 
  constructor(  
    private service: MovieApiServiceService,
    private router: ActivatedRoute,
    private title: Title,
    private modalService: NgbModal
  ) {}

  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;
  

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
    // console.log(this.c, "kenkemam");
    
  }

  openTrailerModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' });
    
  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe((result) => {
      console.log(this.getMovieDetailResult, "movie details result");
      
      this.getMovieDetailResult = result;
    });
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      for (const element of result.results) {
        if (element.type === 'Trailer') {
          console.log(element.key, 'inside loop');
          this.getMovieVideoResult = element.key;
          this.c = this.killadi(); // Set c after getMovieVideoResult is available
          console.log(this.c, "working link check");
          break;
        }
      }
    });
  }

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      this.getMovieCastResult = result.cast;
    });
  }
}