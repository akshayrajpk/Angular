export interface MovieDetails{
    name: string,
    genre: string,
    duration: number,
    director: string,
    production: string,
    year: number,
    certificate: string,
    rating: number
}

export enum Genre {
    ACTION = "Action",
    ANIMATION = "Animation",
    COMEDY = "Comedy",
    Crime = "Crime",
    Drama = "Drama",
    Fantasy = "Fantasy",
    Historical = "Historical",
    Romance = "Romance",

}

export enum Certificates{
    U ="U",
    UA = "UA",
    A = "A",
    S = "S"
}

export interface SearchCriteria{
    name?: string,
    genre?: string[],
    duration?: number,
    director?: string,
    year?: number[],
    certificate?: string[],
    rating?: string[]
}
