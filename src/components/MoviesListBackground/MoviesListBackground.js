import { Component, Fragment } from 'react';
import { Empty, Alert } from 'antd';

import './MoviesListBackground.scss';

export default class MoviesListBackground extends Component {
  render() {
    const { hasSearched, hasFound, hasError, errorMessage } = this.props;

    return (
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
        {hasSearched && !hasFound ? (
          <Alert
            message="Not found"
            description="No movies were found matching your request."
            type="info"
            showIcon
            style={{ width: '375px', position: 'absolute', top: '15%' }}
          />
        ) : null}
        {/* Сервер не ответил или данные пришли с ошибкой. */}
        {hasError ? (
          <Alert
            message="Server not responce"
            description={`No response was received from the server. Error message: ${errorMessage}`}
            type="error"
            showIcon
            style={{ width: '375px', position: 'absolute', top: '15%' }}
          />
        ) : null}
      </Fragment>
    );
  }
}
