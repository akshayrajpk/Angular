import { Component, Input, OnInit } from '@angular/core';
import { MovieDetails } from 'src/app/models/movie-model';

@Component({
  selector: 'app-movie-list-element',
  templateUrl: './movie-list-element.component.html',
  styleUrls: ['./movie-list-element.component.scss']
})
export class MovieListElementComponent implements OnInit {

  @Input() movieDetails : MovieDetails | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
