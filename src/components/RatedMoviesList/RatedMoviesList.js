import { Component } from 'react';
import { Layout, Space, Empty } from 'antd';
const { Content } = Layout;

import './RatedMoviesList.scss';

export default class RatedMoviesList extends Component {
  state = {
    movies: [],
  };

  render() {
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
        <div style={{ height: '32px' }}></div>
        {this.state.movies.length > 0 ? (
          <Space
            style={{
              paddingTop: '35px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '35px',
            }}
          ></Space>
        ) : (
          <Empty
            style={{
              height: '500px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          />
        )}
      </Content>
    );
  }
}
