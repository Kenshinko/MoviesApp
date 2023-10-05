import { Component, Fragment } from 'react';
import { Layout, Space, Empty, Spin } from 'antd';
const { Content } = Layout;

import './MoviesList.scss';
import SearchPanel from '../SearchPanel';
import MoviesListBackground from '../MoviesListBackground';
import { debounce, getMoviesList } from '../../services/moviesapi.js';

export default class MoviesList extends Component {
  state = {
    movies: [],
    hasSearched: false,
    hasLoading: false,
    hasFound: false,
    hasError: false,
    errorMessage: '',
    totalResults: 0,
    totalPages: 0,
    searchQuery: '',
    activePage: this.props.currentPage,
  };

  setSearchQuery = (query) => {
    this.setState({
      searchQuery: query,
    });

    this.handleSearching();
  };

  handleSearchQuery = debounce(() => {
    getMoviesList(this.state.searchQuery, this.state.activePage)
      .then((data) => {
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
      })
      .finally(this.handleLoading(false));
  }, 350);

  handleSearching = debounce(() => {
    this.handleLoading(true);
    this.handleSearchQuery();
  }, 650);

  handleLoading = (boolean) => {
    this.setState({
      hasLoading: boolean,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.totalResults !== prevState.totalResults ||
      this.state.totalPages !== prevState.totalPages
    ) {
      this.props.handleNavigation(this.state.totalResults, this.state.totalPages);
    }

    if (this.props.currentPage !== prevState.activePage) {
      this.setState({
        activePage: this.props.currentPage,
      });

      this.handleSearching();
    }
  }

  render() {
    // Рендерим список найденого.
    const foundMoviesList = (
      <Space
        className="movielist"
        style={{
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {this.props.renderMoviesList(this.state.movies)}
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
        <SearchPanel inputValue="" setSearchQuery={this.setSearchQuery} />
        {this.state.hasLoading ? (
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
            <Spin
              size="large"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(2)',
              }}
            />
          </Fragment>
        ) : this.state.hasFound ? (
          foundMoviesList
        ) : (
          <MoviesListBackground
            hasSearched={this.state.hasSearched}
            hasFound={this.state.hasFound}
            hasError={this.state.hasError}
            errorMessage={this.state.errorMessage}
          />
        )}
      </Content>
    );
  }
}
