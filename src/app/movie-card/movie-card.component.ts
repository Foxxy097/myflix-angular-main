import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  userFavoriteMovies: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavoriteMovies();
  }

  //Get all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  // open Director dialog
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { Name: name, Bio: bio, Birth: birth },
      width: '500px',
    });
  }
  // Open Genre View
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
    });
  }
  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px',
    });
  }
  getUserFavoriteMovies(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      console.log(resp);
      this.userFavoriteMovies = resp.FavoriteMovie;
      return this.userFavoriteMovies;
    });
  }

  addToUserFavs(id: string): void {
    console.log(id);
    this.fetchApiData.addFavMovie(id).subscribe((response: any) => {
      console.log(response);
    });
    this.ngOnInit();
  }

  // check if the movie is a favorite one and return boolean
  isFavorite(id: string): boolean {
    const isFav = this.userFavoriteMovies.indexOf(id) > -1;
    return isFav;
  }

  DeleteFavs(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavMovie(id).subscribe((response: any) => {
      console.log(response);
    });
    this.ngOnInit();
  }
}