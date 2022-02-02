import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchName: '',
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchName.trim() === '') {
      return toast.warn('Введите название фото или картинки!', {
        theme: 'colored',
      });
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  handleSearchNameChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  render() {
    const { searchName } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__button__label}>Search</span>
          </button>

          <input
            className={s.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchName}
            onChange={this.handleSearchNameChange}
          />
        </form>
      </header>
    );
  }
}
