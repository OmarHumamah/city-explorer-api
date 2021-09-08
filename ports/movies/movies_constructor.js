function Movie(info) {
    this.title = info.original_title,
      this.overview = info.overview,
      this.average_votes= info.vote_average,
      this.total_votes= info.vote_count,
      this.image_url= `https://image.tmdb.org/t/p/w500${info.poster_path}`,
      this.popularity= info.popularity,
      this.released_on= info.release_date
  }

  module.exports = Movie