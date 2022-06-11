import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { MovieDetails, SearchCriteria } from '../models/movie-model';


@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  private BaseUrl = "http://localhost:5000"

  latestFetchResults: Observable<any> = new Observable<any>();

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

  constructor(private http: HttpClient) {}

  getList(forceUpdate: boolean, criteria: SearchCriteria): Observable<any> {
    if (forceUpdate) {
      return this.http.get(this.BaseUrl+'/getMovie').pipe(
        tap((res) => (this.latestFetchResults = of(res))),
        map((response) => {
          return response;
        })
      );
    } else {
      return this.filteredData(this.latestFetchResults, criteria)
    }
  }

  filteredData(
    fetchedResult: Observable<MovieDetails[]>,
    criteria: SearchCriteria
  ): Observable<MovieDetails[]> {
    return fetchedResult.pipe(
      map((res) => {
        let filteredItems = res;        
        filteredItems = this.filterByName(filteredItems, criteria)
        filteredItems = this.filterByDuration(filteredItems, criteria)        
        filteredItems =  this.filterByGenre(filteredItems, criteria)
        filteredItems =  this.filterByYear(filteredItems, criteria)
        filteredItems =  this.filterByCertificate(filteredItems, criteria)
        filteredItems =  this.filterByRating(filteredItems, criteria)
        return filteredItems;    

      })
    );
  }

  filterByName(res: MovieDetails[], criteria: SearchCriteria): MovieDetails[] {  
    if(criteria.name == undefined || criteria.name.length == 0)
      return res
    let name = criteria.name
    return res.filter((temp) =>{
      return temp.name.toLowerCase().includes(name.toLowerCase())
    });
  }

  filterByDuration(res: MovieDetails[], criteria: SearchCriteria): MovieDetails[]{    
    if(criteria.duration == undefined || criteria.duration == 0)
      return res
    let duration = parseInt(criteria.duration as unknown as string)
    return res.filter((data)=>{      
      return data.duration == duration
    })
  }

  filterByGenre(res: MovieDetails[], criteria: SearchCriteria): MovieDetails[]{    
    if(criteria.genre == undefined || criteria.genre?.length == 0)
      return res
    return res.filter((data)=>{
      let genre = data.genre.toLowerCase();
      return criteria.genre?.some(value =>{
        return value.toLowerCase() == genre
      })
    })
  }

  filterByYear(res: MovieDetails[], criteria: SearchCriteria): MovieDetails[]{   
    if(criteria.year == undefined || criteria.year?.length == 0)
      return res
    return res.filter((data)=>{
      let year = data.year;
      return criteria.year?.some(value =>{
        return value == year
      })
    })
  }

   filterByCertificate(res: MovieDetails[], criteria: SearchCriteria): MovieDetails[]{       
    if(criteria.certificate == undefined || criteria.certificate?.length == 0)
      return res
    return res.filter((data)=>{
      let certificate = data.certificate.toLowerCase();
      return criteria.certificate?.some(value =>{
        return value.toLowerCase() == certificate
      })
    })
  }

  filterByRating(res: MovieDetails[], criteria: SearchCriteria): MovieDetails[]{
    if(criteria.rating == undefined || criteria.rating?.length == 0)
      return res
      return res.filter((data)=>{
        let rating = data.rating
        return criteria.rating?.some(value =>{
          let rangeStart = parseFloat(value.split('-')[0])
          let rangeEnd = parseFloat(value.split('-')[1])
          return rating>=rangeStart && rating<=rangeEnd
        })
      })
  }
}
