import { Component } from 'react';
import { Tabs } from 'antd';
import { format } from 'date-fns';

import './Navigation.scss';

import MoviesList from '../MoviesList';
import MovieItem from '../MovieItem';
import RatedMoviesList from '../RatedMoviesList';

export default class Navigation extends Component {
  state = {
    update: false,
  };

  setToUpdate = () => {
    this.setState(() => {
      return {
        update: !this.state.update,
      };
    });
  };

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
          key={movie.id}
          ID={movie.id}
          shortTitle={this.setTruncateText(movie.title, 3)}
          fullTitle={movie.title}
          genreIDs={movie.genre_ids}
          coverPath={movie.poster_path}
          avgRating={movie.vote_average.toFixed(1)}
          ownRating={movie.rating}
          release={this.setReleaseDate(movie.release_date)}
          overview={this.setTruncateText(movie.overview, 30)}
          update={this.state.update}
          setToUpdate={this.setToUpdate}
        />
      );
    });
  };

  render() {
    const { handleNavigation, currentPage, sessionID } = this.props;

    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <MoviesList
            handleNavigation={handleNavigation}
            currentPage={currentPage}
            renderMoviesList={this.renderMoviesList}
          />
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <RatedMoviesList
            sessionID={sessionID}
            renderMoviesList={this.renderMoviesList}
            update={this.state.update}
          />
        ),
      },
    ];

    return <Tabs className="navigation" defaultActiveKey="1" items={items} />;
  }
}
