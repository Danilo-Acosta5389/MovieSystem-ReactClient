  
  

  export const GET_ALL_PERSONS = "https://localhost:7147/api/Person";
  export const GetPersonById = (person_id) => `https://localhost:7147/api/Person/${person_id}`;


  export const GetAllMoviesByperson_id = (person_id) => `https://localhost:7147/api/PersonMovie/personId?personId=${person_id}`;
  export const GET_ALL_MOVIES = "https://localhost:7147/api/movie/";
  export const SET_PERSON_MOVIE = (person_id) => `https://localhost:7147/api/PersonMovie/PersonId?personId=${person_id}`;
  export const SET_PERSON_MOVIE2 = "https://localhost:7147/api/PersonMovie/";

  export const GetLikedGenreByperson_id = (person_id) => `https://localhost:7147/api/LikedGenre/personId?personId=${person_id}`;
  export const GET_ALL_GENRES = "https://localhost:7147/api/Genre";

  export const SET_LIKED_GENRE = "https://localhost:7147/api/LikedGenre";