import { Component } from 'react';
import { Tabs } from 'antd';

import './Navigation.scss';

import MoviesList from '../MoviesList';
import RatedMoviesList from '../RatedMoviesList';

export default class Navigation extends Component {
  render() {
    const items = [
      {
        key: '1',
        label: 'Search',
        children: <MoviesList />,
      },
      {
        key: '2',
        label: 'Rated',
        children: <RatedMoviesList />,
      },
    ];

    return <Tabs className="navigation" defaultActiveKey="1" items={items} />;
  }
}
