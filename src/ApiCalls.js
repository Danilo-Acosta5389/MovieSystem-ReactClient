  
  

  export const GET_ALL_PERSONS = "https://localhost:7147/api/Person";
  export const GetPersonById = (personId) => `https://localhost:7147/api/Person/${personId}`;


  export const GetAllMoviesByPersonId = (personId) => `https://localhost:7147/api/PersonMovie/PersonId?personId=${personId}`;
  export const GET_ALL_MOVIES = "https://localhost:7147/api/movie/";

  export const GetLikedGenreByPersonId = (personId) => `https://localhost:7147/api/LikedGenre/personId?personId=${personId}`;
  export const GET_ALL_GENRES = "https://localhost:7147/api/Genre";
  