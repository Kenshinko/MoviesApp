import { Component } from 'react';
import { Layout, Pagination } from 'antd';

const { Header, Footer } = Layout;

import '../../rest.scss';
import './App.scss';

import Navigation from '../Navigation';
// import { getMoviesList } from '../../services/moviesapi.js';

export default class App extends Component {
  render() {
    return (
      <Layout className="app">
        <Header className="app__header">
          <Navigation />
        </Header>
        <Footer
          style={{
            padding: '35px 50px',
            textAlign: 'center',
            backgroundColor: '#fff',
          }}
        >
          <Pagination
            onChange={() => {
              console.log('Click');
            }}
            defaultCurrent={1}
            pageSize={6}
            total={20}
          />
        </Footer>
      </Layout>
    );
  }
}
