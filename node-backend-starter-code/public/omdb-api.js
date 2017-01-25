// A set of functions wrapping the REST endpoints exposed by www.omdbapi.com
// These REST calls are asynchronous and take callbacks - when the REST call
// completes then the provided function is called with the result. This lets
// the user continue to interact with the rest of the UI.
// Seperating the omdbApi calls into their own javascript file, and their own
// javascript object, allows us to separate out different concerns of our
// client - in this case the logic for making calls to an external API is kept
// separate from the calls that manage the UI elements (in movie-list.js).
function omdbApi() {
  return {
    searchOmdb: function(searchText, onLoad, onError) {
      var searchUrl = 'http://www.omdbapi.com/?type=movie&s=';
      var searchRequest = new XMLHttpRequest();
      var requestUrl = searchUrl + encodeURIComponent(searchText.trim());
      searchRequest.open("GET", requestUrl, true);

      searchRequest.onload = function(event) {
        var results = JSON.parse(searchRequest.responseText);
        onLoad(results);
      };
      searchRequest.onerror = function(event) {
        onError(searchRequest);
      };
      searchRequest.send(null);
    },

    getMovieDetails: function(imdbID, onLoad, onError) {
      var movieDetailUrl = 'http://www.omdbapi.com/?plot=full&i=';
      var movieDetailRequest = new XMLHttpRequest();
      var requestUrl = movieDetailUrl + encodeURIComponent(imdbID);
      movieDetailRequest.open("GET", requestUrl, true);

      movieDetailRequest.onload = function(event) {
        var results = JSON.parse(movieDetailRequest.responseText);
        onLoad(results);
      };
      movieDetailRequest.onerror = function(event) {
        onError(movieDetailRequest);
      };
      movieDetailRequest.send(null);
    }
  };
}
