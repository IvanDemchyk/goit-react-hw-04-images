import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  SearchContainer,
  SearchForm,
  SearchButton,
  SearchInput,
} from './SearchBar.styled';
import { ImSearch } from 'react-icons/im';

export const SearchBar = ({ submit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    submit(query);
    setQuery('');
  };

  const handleChange = ({ currentTarget }) => {
    setQuery(currentTarget.value);
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <ImSearch size={25} />
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={query}
        />
      </SearchForm>
    </SearchContainer>
  );
};

SearchBar.propTypes = {
  submit: PropTypes.func.isRequired,
};
