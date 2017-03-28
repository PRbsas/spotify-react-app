import React from 'react';

const Search = ({ placeholder, value, onChange, onSubmit, children }) =>
        <form onSubmit={onSubmit} className="search">
          <input
            placeholder={placeholder}
            type="text"
            value={value}
            onChange={onChange}
          />
          <button type="submit">
            {children}
          </button>
        </form>

export default Search;
