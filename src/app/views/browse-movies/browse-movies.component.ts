import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@ng-stack/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Certificates, Genre, MovieDetails, SearchCriteria } from 'src/app/models/movie-model';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { DropdownMultiselectComponent } from '../dropdown-multiselect/dropdown-multiselect.component';

@Component({
  selector: 'app-browse-movies',
  templateUrl: './browse-movies.component.html',
  styleUrls: ['./browse-movies.component.scss']
})
export class BrowseMoviesComponent implements OnInit {

  items$: Observable<MovieDetails[]> = new Observable<MovieDetails[]>();
  searchName: FormControl<string> = new FormControl<string>('');
  searchGenre: FormControl<string> = new FormControl<string>('');
  searchDuration: FormControl<number> = new FormControl<number>();
  criteria: SearchCriteria = {};

  selectedGenre: FormControl<string[]> = new FormControl<
    string[]
  >([]);

  selectedYears: FormControl<number[]> = new FormControl<
  number[]
  >([]);

  selectedCertificates: FormControl<string[]> = new FormControl<
    string[]
  >([]);

  selectedRatings: FormControl<string[]> = new FormControl<
    string[]
  >([]);

  @ViewChild('genreSelectionDropdown')
  private genreSelector!: DropdownMultiselectComponent;


  constructor(private service: MovieServiceService) {}

  ngOnInit(): void {
    this.items$ = this.service.getList(true, this.criteria).pipe(take(1));

    this.searchName.valueChanges.subscribe((name) => {
      this.criteria.name = name;      
      this.refreshFilter()
    });

    this.searchGenre.valueChanges.subscribe((genre) => {
      this.genreSelector.allSelected.select()
      this.genreSelector.toggleAllSelection()
      this.criteria.genre=[genre]
      if(genre == "")
        this.criteria.genre = undefined       
      this.refreshFilter()
      });

    this.searchDuration.valueChanges.subscribe((duration) => {
      this.criteria.duration = duration;           
      this.refreshFilter()
    });

    this.selectedGenre.valueChanges.subscribe((values) => {
      this.criteria.genre = values;
      this.refreshFilter()
    });

    this.selectedYears.valueChanges.subscribe((values)=>{
      this.criteria.year = values;
      this.refreshFilter()
    })

    this.selectedCertificates.valueChanges.subscribe((values)=>{
      this.criteria.certificate = values;
      this.refreshFilter()
    })

    this.selectedRatings.valueChanges.subscribe((values)=>{
      this.criteria.rating = values;
      this.refreshFilter()
    })
  }

  refreshFilter(){
    this.items$ = this.service.getList(false, this.criteria).pipe(take(1)); 
  }

  clearNameSearchField() {
    setTimeout(() => {
      this.searchName.reset();
    });
  }

  clearGenreSearchField(){
    setTimeout(() => {   
    this.criteria.genre = undefined
    this.searchGenre.reset()
    })
  }

  clearDurationSearchField(){
    this.searchDuration.reset()
  }

  recieveSelectedGenre(selectedItems: any) {
    this.selectedGenre.setValue(selectedItems);
  }

  recieveSelectedYears(selectedItems: any) {
    this.selectedYears.setValue(selectedItems);
  }

  recieveSelectedCertificates(selectedItems: any) {
    this.selectedCertificates.setValue(selectedItems);
  }

  recieveSelectedRatings(selectedItems: any){
    this.selectedRatings.setValue(selectedItems)
  }

  getGenre(): any[]{
    return Object.values(Genre)
  }

  getYears(): number[]{
    return Array(53).fill(1).map((element, index)=> index + 1970)
  }

  getCertificates(): any[]{
    return Object.values(Certificates)
  }

  getRatings():any[]{
    return Array(10).fill(1).map((element, index)=> {return index == 9 ? index + " - " + (index+ 1) : index + " - " + (index+ 0.9)} )
  }
}
