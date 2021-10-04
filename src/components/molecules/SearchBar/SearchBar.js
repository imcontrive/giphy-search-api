import React from 'react';
import './searchbar.css';

export default function SearchBar() {
    const [query, setQuery] = React.useState('');

    const handleChange = e => {
        setQuery(e.target.value)
    }

    return (
        <form className="search">
        <input
          type="text"
          className="search-bar"
          onChange={handleChange}
          placeholder="Type to search..."
          autoFocus
        />
      </form>
    )
}
