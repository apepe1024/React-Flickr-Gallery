import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SearchInput from './SearchInput';

class Navigation extends Component {
  /**
   * Navigates to a new search route based on user input
   * @param query
   */
  navigateToRoute = (query) => {
    window.location.assign(`/search/${query}`);
  }
  render() {
    return (
      <div>
        <SearchInput onSubmit={this.navigateToRoute} />
        <ul className='main-nav'>
          <li className='list-item'>
            <NavLink to='/search/cats'>Cats</NavLink>
          </li>
          <li className='list-item'>
            <NavLink to='/search/dogs'>Dogs</NavLink>
          </li>
          <li className='list-item'>
            <NavLink to='/search/skunks'>Skunks</NavLink>
          </li>
        </ul>
      </div>
    );
  }
};

export default Navigation;
