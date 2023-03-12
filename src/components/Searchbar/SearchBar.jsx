import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  SearchContainer,
  SearchForm,
  SearchButton,
  SearchInput,
} from './SearchBar.styled';
import { ImSearch } from 'react-icons/im';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.submit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  handleChange = evt => this.setState({ searchQuery: evt.currentTarget.value });

  render() {
    return (
      <SearchContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <ImSearch size={25} />
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.searchQuery}
          />
        </SearchForm>
      </SearchContainer>
    );
  }
}

SearchBar.propTypes = {
  submit: PropTypes.func.isRequired,
};
