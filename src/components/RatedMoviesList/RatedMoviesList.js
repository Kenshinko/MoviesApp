import { Component } from 'react';
import { Layout, Space } from 'antd';
const { Content } = Layout;

import './RatedMoviesList.scss';

export default class RatedMoviesList extends Component {
  render() {
    return (
      <Content className="app__content content">
        <Space className="content__movieslist">Nothing special...</Space>
      </Content>
    );
  }
}
