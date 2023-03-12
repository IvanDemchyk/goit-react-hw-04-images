import { Component } from 'react';
import Notiflix from 'notiflix';

import { SearchBar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import getImages from './fetchimages/fetchImages';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout.styled';

let page = 1;

export class App extends Component {
  state = {
    searchQuery: '',
    items: [],
    totalHits: 0,
    status: 'idle',
  };

  handleFormSubmit = async searchQuery => {
    page = 1;
    if (searchQuery.trim() === '') {
      Notiflix.Notify.failure('Try to enter something');
      return;
    } else {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await getImages(searchQuery, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          Notiflix.Notify.failure('No images found. Try again');
        } else {
          this.setState({
            items: hits,
            searchQuery,
            totalHits: totalHits,
            status: 'resolved',
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  };

  loadMoreImg = async () => {
    this.setState({ status: 'pending' });
    try {
      const { hits } = await getImages(this.state.searchQuery, (page += 1));
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  render() {
    const { totalHits, items, status } = this.state;
    if (status === 'idle') {
      return (
        <Layout>
          <SearchBar submit={this.handleFormSubmit} />
          <GlobalStyle />
        </Layout>
      );
    }
    if (status === 'pending') {
      return (
        <Layout>
          <SearchBar submit={this.handleFormSubmit} />
          <ImageGallery page={page} items={items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.loadMoreImg} />}
          <GlobalStyle />
        </Layout>
      );
    }

    if (status === 'rejected') {
      return (
        <Layout>
          <SearchBar submit={this.handleFormSubmit} />
          <p>Something went wrong</p>
          <GlobalStyle />
        </Layout>
      );
    }

    if (status === 'resolved') {
      return (
        <Layout>
          <SearchBar submit={this.handleFormSubmit} />
          <ImageGallery page={page} items={items} />
          <GlobalStyle />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.loadMoreImg} />
          )}
        </Layout>
      );
    }
  }
}
