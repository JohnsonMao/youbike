import React from 'react';

import { ReactComponent as SearchIcon } from '../../asset/icon/search.svg';
import './search.scss';

export default function Search() {
  return (
    <form>
      <div className="form__group d-flex mx-auto">
        <input type="search" placeholder='尋找站點' className="form__control fs-1 shadow w-100 p-4 me-1"/>
        <button type="button" className="btn btn--dark p-4 shadow">
          <SearchIcon />
        </button>
      </div>
    </form>
  )
}