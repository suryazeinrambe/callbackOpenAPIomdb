$(".search-button").on("click", function () {
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=330ace56&s=" + $(".input-keyword").val(),
    success: (result) => {
      const movies = result.Search;
      let cards = "";
      // console.log(movies);
      movies.forEach((m) => {
        //   console.log(m);
        cards += showCards(m);
      });
      $(".movie-container").html(cards);

      //
      //
      //
      // Ketika tombol detail diklik
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url: "http://www.omdbapi.com/?apikey=330ace56&i=" + $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = showMovieDetail(m);
            `
              <div class="container-fluid">
                  <div class="row">
                      <div class="col-md-3">
                          <img src="${m.Poster}" alt="" class="img-fluid">
                      </div>
                      <div class="col-md">
                          <ul class="list-group">
                              <li class="list-group-item"><h4>${m.Title}</h4></li>
                              <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                              <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                              <li class="list-group-item"><strong>Penulis : </strong>${m.Writer}</li>
                              <li class="list-group-item"><strong>Plot : </strong> ${m.Plot}</li>
                            </ul>
                      </div>
                  </div>
                </div>
                  `;
            $(".modal-body").html(movieDetail);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseJSON.Error);
    },
  });
});

function showCards(m) {
  return `
                <div class="col-md-4 my-3 px-4 py-5">
                    <div class="card">
                        <img src="${m.Poster}" class="card-img-top "/>
                        <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}.</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Lihat Detail...</a>
                        </div>
                    </div>
                </div>
      `;
}

function showMovieDetail(m) {
  return `
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <img src="${m.Poster}" alt="" class="img-fluid">
            </div>
            <div class="col-md">
                <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title}</h4></li>
                    <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                    <li class="list-group-item"><strong>Penulis : </strong>${m.Writer}</li>
                    <li class="list-group-item"><strong>Plot : </strong> ${m.Plot}</li>
                  </ul>
            </div>
        </div>
      </div>
        `;
}
