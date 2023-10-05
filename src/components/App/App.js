import React, { Component, Fragment } from 'react';
import { Layout, Pagination, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';
const { Header, Footer } = Layout;

import '../../rest.scss';
import './App.scss';
import Navigation from '../Navigation';
import { getGuestSession, getGenres } from '../../services/moviesapi.js';
import { ContextProvider } from '../../services/context.js';

export default class App extends Component {
  state = {
    totalResults: 1,
    totalPages: 0,
    moviesPerPage: 20,
    currentPage: 1,
    sessionID: null,
    movieGenres: [],
  };

  session = JSON.parse(localStorage.getItem('session'));

  componentDidMount() {
    if (new Date(this.session?.expires_at).getTime() <= new Date().getTime()) {
      localStorage.removeItem('session');
    }

    this.setState({
      sessionID: this.session?.guest_session_id,
    });

    getGenres().then((res) => {
      if (res === 'Failed to fetch') return;
      this.setState({
        movieGenres: [...res.genres],
      });
    });
  }

  componentDidUpdate() {
    if (!this.session || this.session === 'Failed to fetch') {
      getGuestSession().then((response) => {
        localStorage.setItem('session', JSON.stringify(response));
      });
    }
  }

  handleNavigation = (results, pages) => {
    this.setState({
      totalResults: results,
      totalPages: pages,
    });
  };

  setCurrentPage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };

  render() {
    const connectionIssues = (
      <Fragment>
        <p>
          Sorry, but it looks like there is no internet connection available at the
          moment. Here are a few recommendations to troubleshoot the issue:
        </p>
        <ol style={{ padding: '15px 0' }}>
          <li>
            Check your Wi-Fi or Ethernet connection to ensure it is properly
            connected and functional.
          </li>
          <li>Restart your modem or router to refresh the network connection.</li>
          <li>
            Try connecting to a different Wi-Fi network or using a wired Ethernet
            connection.
          </li>
          <li>
            Ensure that airplane mode is turned off on your device, as it may disable
            network connectivity.
          </li>
          <li>
            Verify if other devices are able to connect to the internet. If they can,
            the issue may be specific to your device.
          </li>
          <li>
            Contact your Internet Service Provider (ISP) to check for any service
            outages or technical issues in your area.
          </li>
        </ol>
        <p>
          Hopefully, these steps will help you resolve the internet connection
          problem. Let me know if you need further assistance!
        </p>
      </Fragment>
    );

    return (
      <Layout
        style={{
          height: '100vh',
          margin: '0 auto',
          maxWidth: '1145px',
          minWidth: '420px',
          backgroundColor: '#fff',
        }}
      >
        <Online>
          <ContextProvider value={this.state}>
            <Header style={{ height: 'auto', backgroundColor: '#fff' }}>
              <Navigation
                handleNavigation={this.handleNavigation}
                currentPage={this.state.currentPage}
                sessionID={this.state.sessionID}
              />
            </Header>
            <Footer
              className="footer"
              style={{
                textAlign: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Pagination
                onChange={(event) => this.setCurrentPage(event)}
                currentPage={this.state.currentPage}
                pageSize={this.state.moviesPerPage}
                total={this.state.totalResults}
                showSizeChanger={false}
                hideOnSinglePage
              />
            </Footer>
          </ContextProvider>
        </Online>

        <Offline>
          <Alert
            message="No internet connection"
            description={connectionIssues}
            type="error"
            showIcon
            style={{ maxWidth: '935px', margin: 'auto' }}
          />
        </Offline>
      </Layout>
    );
  }
}
