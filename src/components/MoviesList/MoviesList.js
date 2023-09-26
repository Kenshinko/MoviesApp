import { Component, Fragment } from 'react';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { Layout, Space, Empty, Alert } from 'antd';
const { Content } = Layout;

import './MoviesList.scss';
import SearchPanel from '../SearchPanel';
import MovieItem from '../MovieItem';
import { debounce, getMoviesList } from '../../services/moviesapi.js';

export default class MoviesList extends Component {
  state = {
    movies: [],
    hasSearched: false,
    hasFound: false,
    hasError: false,
    errorMessage: '',
    totalResults: 0,
    totalPages: 0,
  };

  handleSearchQuery = debounce((query) => {
    getMoviesList(query).then((data) => {
      // Если данные не получены от сервера, выходим с отметкой об ошибке.
      if (typeof data !== 'object') {
        this.setState({
          hasError: true,
          errorMessage: data,
        });
        return;
      }
      // Распихиваем полученные данные по стейту.
      this.setState({
        hasSearched: true,
        movies: [...data.results],
        totalResults: data.total_results,
        totalPages: data.total_pages,
      });
      // Если текущий поиск не дал результатов, выходим с отметкой о безуспешном поиске.
      if (data.total_results === 0) {
        this.setState({
          hasFound: false,
        });
        return;
      }
      // Поиск успешен, завершаем выполнение и делаем отметку в стейте.
      this.setState({
        hasFound: true,
      });
    });
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

  renderMoviesList = (movies) => {
    return movies.map((movie) => {
      return (
        <MovieItem
          key={nanoid()}
          shortTitle={this.setTruncateText(movie.title, 3)}
          fullTitle={movie.title}
          coverPath={movie.poster_path}
          avgRating={movie.vote_average.toFixed(1)}
          release={this.setReleaseDate(movie.release_date)}
          overview={this.setTruncateText(movie.overview, 38)}
        />
      );
    });
  };

  render() {
    // Исходное состояние компонента, поиск не был произведен.
    const initialMoviesList = (
      <Fragment>
        <Empty
          style={{
            height: '500px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        />
        {/* Ничего не найдено, список фильмов пуст. */}
        {this.state.hasSearched && !this.state.hasFound ? (
          <Alert
            message="Not found"
            description="No movies were found matching your request."
            type="info"
            showIcon
            style={{ width: '375px', position: 'absolute', top: '15%' }}
          />
        ) : null}
        {/* Сервер не ответил или данные пришли с ошибкой. */}
        {this.state.hasError ? (
          <Alert
            message="Server not responce"
            description={`No response was received from the server. Error message: ${this.state.errorMessage}`}
            type="error"
            showIcon
            style={{ width: '375px', position: 'absolute', top: '15%' }}
          />
        ) : null}
      </Fragment>
    );

    // Рендерим список найденого.
    const foundMoviesList = (
      <Space
        style={{
          paddingTop: '35px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '35px',
        }}
      >
        {this.renderMoviesList(this.state.movies)}
      </Space>
    );

    return (
      <Content
        style={{
          maxWidth: '935px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SearchPanel inputValue="" handleSearchQuery={this.handleSearchQuery} />
        {this.state.hasFound ? foundMoviesList : initialMoviesList}
      </Content>
    );
  }
}
