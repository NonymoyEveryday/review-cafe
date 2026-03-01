import React from 'react';
const SearchData = ({ searchQuery, handleSearchChange }) => {
    return (
        <div className="search-box mb-3">
            <input
                type="text"
                placeholder="ค้นหานักศึกษา..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-control"
            />
        </div>
    );
}
export default SearchData;

