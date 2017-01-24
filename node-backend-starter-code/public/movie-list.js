function buildMovieList(searchForm, movieList) {
  function searchOmdb(searchText, onLoad, onError) {
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
    }
    searchRequest.send(null);
  }

  function buildMovieElement(movieData) {
    var title = movieData.Title;
    var year = movieData.Year;
    var id = movieData.imdbID;

    var movieElement = document.createElement('li');
    movieElement.innerHTML = title;

    return movieElement;
  }

  searchForm.addEventListener("submit", function(event) {
    var searchText = searchForm.elements['searchText'].value;
    searchOmdb(searchText, function(results) {
      console.log("OnLoad: " + JSON.stringify(results[0]));

      // remove all elements currently in the search results
      movieList.innerHTML = "";

      // iterate over all results from the search:
      //  - build an li element to go in the movie list element
      //  - append the constructed element to the list
      var searchValues = results['Search'];
      for(var i in searchValues) {
        var li = buildMovieElement(searchValues[i]);
        movieList.append(li);
      }
    });
    return false;
  });
}
