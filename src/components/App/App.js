import { Component, Fragment } from 'react';
import { Layout, Pagination, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

const { Header, Footer } = Layout;

import '../../rest.scss';
import './App.scss';

import Navigation from '../Navigation';

export default class App extends Component {
  state = {
    totalResults: 0,
    totalPages: 0,
    moviesPerPage: 20,
    currentPage: 1,
  };

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
          <Header style={{ height: 'auto', backgroundColor: '#fff' }}>
            <Navigation
              handleNavigation={this.handleNavigation}
              currentPage={this.state.currentPage}
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
              defaultCurrent={1}
              currentPage={this.state.currentPage}
              pageSize={this.state.moviesPerPage}
              total={this.state.totalResults}
              showSizeChanger={false}
            />
          </Footer>
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
