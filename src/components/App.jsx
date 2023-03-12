import { useState } from 'react';
import Notiflix from 'notiflix';

import { SearchBar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';

import getImages from './fetchimages/fetchImages';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

let page = 1;

export const App = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  // const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const handleFormSubmit = async query => {
    page = 1;
    if (query.trim() === '') {
      Notiflix.Notify.failure('Try to enter something');
      return;
    } else {
      try {
        setStatus(Status.PENDING);
        const { totalHits, hits } = await getImages(query, page);
        if (hits.length < 1) {
          setStatus(Status.IDLE);
          Notiflix.Notify.failure('No images found. Try again');
        } else {
          setItems(prev => [...prev, ...hits]);
          setQuery(query);
          setTotalHits(totalHits);
          setStatus(Status.RESOLVED);
        }
      } catch (error) {
        setError('Something went wrong');
        setStatus(Status.REJECTED);
      }
    }
  };

  const loadMoreImg = async () => {
    setStatus(Status.PENDING);
    try {
      const { hits } = await getImages(query, (page += 1));
      setItems(prev => [...prev, ...hits]);
      setStatus(Status.RESOLVED);
    } catch (error) {
      setStatus(Status.REJECTED);
    }
  };

  if (status === 'idle') {
    return (
      <Layout>
        <SearchBar submit={handleFormSubmit} />
        <GlobalStyle />
      </Layout>
    );
  }
  if (status === 'pending') {
    return (
      <Layout>
        <SearchBar submit={handleFormSubmit} />
        <ImageGallery page={page} items={items} />
        <Loader />
        {totalHits > 12 && <Button onClick={loadMoreImg} />}
        <GlobalStyle />
      </Layout>
    );
  }

  if (status === 'rejected') {
    return (
      <Layout>
        <SearchBar submit={handleFormSubmit} />
        <ErrorMessage>{error}</ErrorMessage>
        <GlobalStyle />
      </Layout>
    );
  }

  if (status === 'resolved') {
    return (
      <Layout>
        <SearchBar submit={handleFormSubmit} />
        <ImageGallery page={page} items={items} />
        <GlobalStyle />
        {totalHits > 12 && totalHits > items.length && (
          <Button onClick={loadMoreImg} />
        )}
      </Layout>
    );
  }
};
