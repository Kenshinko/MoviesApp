import { Component } from 'react';
import { Layout, Space, Empty } from 'antd';
const { Content } = Layout;

import './RatedMoviesList.scss';
import { getRatedMoviesList } from '../../services/moviesapi.js';

export default class RatedMoviesList extends Component {
  state = {
    ratedMovies: [],
  };

  componentDidMount() {
    getRatedMoviesList(this.props.sessionID).then((movies) => {
      this.setState(() => {
        return {
          ratedMovies: movies.results,
        };
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.update !== prevProps.update) {
      getRatedMoviesList(this.props.sessionID).then((movies) => {
        this.setState(() => {
          return {
            ratedMovies: movies.results,
          };
        });
      });
    }
  }

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
        {this.state.ratedMovies.length > 0 ? (
          <Space
            className="movielist"
            style={{
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {this.props.renderMoviesList(this.state.ratedMovies)}
          </Space>
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
