import { Component } from 'react';
import { Form, Input } from 'antd';

import './SearchPanel.scss';

export default class SearchPanel extends Component {
  state = { inputValue: this.props.inputValue };

  handleQuery = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleSubmit = (event) => {
    if (event.key === 'Enter' && this.state.inputValue.trim()) {
      this.setState({
        inputValue: this.props.inputValue,
      });
    }
  };

  render() {
    const { handleSearchQuery } = this.props;

    return (
      <Form
        onChange={(event) => handleSearchQuery(event.target.value)}
        autoComplete="off"
        style={{ width: '100%' }}
      >
        <Input
          type="text"
          placeholder="Type to search..."
          autoFocus
          required
          value={this.state.inputValue}
          onChange={this.handleQuery}
          onKeyDown={this.handleSubmit}
        />
      </Form>
    );
  }
}
