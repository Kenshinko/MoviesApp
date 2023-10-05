import { Component } from 'react';
import { Form, Input } from 'antd';

import { debounce } from '../../services/moviesapi.js';

import './SearchPanel.scss';

export default class SearchPanel extends Component {
  state = { inputValue: this.props.inputValue };

  handleQuery = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleSubmit = debounce(() => {
    this.setState({
      inputValue: this.props.inputValue,
    });
  }, 500);

  render() {
    const { setSearchQuery } = this.props;

    return (
      <Form
        onChange={() => setSearchQuery(this.state.inputValue)}
        autoComplete="off"
        style={{ width: '100%', minWidth: '388px' }}
      >
        <Input
          type="text"
          placeholder="Type to search..."
          autoFocus
          required
          value={this.state.inputValue}
          onChange={this.handleQuery}
          onKeyUp={this.handleSubmit}
        />
      </Form>
    );
  }
}
