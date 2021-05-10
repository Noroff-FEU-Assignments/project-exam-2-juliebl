import { useState } from 'react';
import Select from 'react-select';

function SearchBar({ data, filteredPlaces, setFilteredPlaces }) {
  let places = [];
  data.forEach((place) => {
    places.push({ label: place.title, value: place.title });
  });

  return (
    <div>
      <Select
        options={places}
        placeholder="Search"
        onChange={(value) => setFilteredPlaces(value ? value.title : null)}
      />
    </div>
  );
}

export default SearchBar;
