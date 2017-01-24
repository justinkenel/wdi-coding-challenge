function buildMovieList(searchForm, movieList, selectedMovieDescription) {
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
    };
    searchRequest.send(null);
  }

  function getMovieDetails(imdbID, onLoad, onError) {
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

  function displayMovieDetails(imdbID) {
    getMovieDetails(imdbID, function(result) {
      // Construct the table containing the information about the selected
      // movie.
      // Setting the value of innerHTML updates the element, in this case
      // creating a table where the items on the left are the labels for the
      // fields on the right
      selectedMovieDescription.innerHTML =
        "<table>" +
        "<tr><td>Title</td><td>" + result.Title + "</td></tr>" +
        "<tr><td>Year</td><td>" + result.Year + "</td></tr>" +
        "<tr><td>Rated</td><td>" + result.Rated + "</td></tr>" +
        "<tr><td>Synopsis</td><td>" + result.Plot + "</td></tr>" +
        "</table>";
    });
  }

  function buildMovieElement(movieData) {
    var title = movieData.Title;
    var year = movieData.Year;
    var imdbID = movieData.imdbID;

    var movieElement = document.createElement('li');
    movieElement.innerHTML = title;
    movieElement.onclick = function() {
      displayMovieDetails(imdbID);
    };

    return movieElement;
  }

  searchForm.addEventListener("submit", function(event) {
    var searchText = searchForm.elements['searchText'].value;
    searchOmdb(searchText, function(results) {
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
