import { Component } from 'react';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { Layout, Space } from 'antd';
const { Content } = Layout;

import './MoviesList.scss';
import SearchPanel from '../SearchPanel';
import MovieItem from '../MovieItem';
import { debounce, getMoviesList } from '../../services/moviesapi.js';

export default class MoviesList extends Component {
  state = {
    movies: [],
  };

  handleSearchQuery = debounce((query) => {
    getMoviesList(query).then((data) =>
      this.setState({
        movies: [...data.results],
      })
    );
  }, 650);

  setReleaseDate = (releaseDate) => {
    if (!releaseDate) {
      return 'Unknown release date';
    }
    return format(new Date(releaseDate), 'MMMM dd, yyyy');
  };

  setTruncateText = (text, words) => {
    const fullText = text.split(' ');
    const croppedText = fullText.filter((word, idx) => idx < words);

    if (fullText.length > words) {
      return `${croppedText.join(' ')} ...`;
    }

    return croppedText.join(' ');
  };

  render() {
    const moviesList = this.state.movies.map((movie) => {
      return (
        <MovieItem
          key={nanoid()}
          title={this.setTruncateText(movie.title, 3)}
          coverPath={movie.poster_path}
          avgRating={movie.vote_average.toFixed(1)}
          release={this.setReleaseDate(movie.release_date)}
          overview={this.setTruncateText(movie.overview, 38)}
        />
      );
    });

    return (
      <Content className="app__content content">
        <SearchPanel inputValue="" handleSearchQuery={this.handleSearchQuery} />
        <Space className="content__movieslist">{moviesList}</Space>
      </Content>
    );
  }
}
