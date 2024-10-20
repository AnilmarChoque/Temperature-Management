import React, { useState } from "react";
import "../pages/home/Home.css";

const SearchBar = ({ size, backgroundColor, onSearch, lupa }) => {

    const searchBar = {
        lupa: lupa || "./src/assets/search.png"
    }

	const backgroundSearch = {
		width: size,
		backgroundColor: backgroundColor || "#101F78",

	};

	const backgroundInput = {
		backgroundColor: backgroundColor || "#101F78",
	};

	const [searchTerm, setSearchTerm] = useState("");

	const handleInputChange = (event) => {
		const value = event.target.value;
		setSearchTerm(value);
		onSearch(value);
	};

	return (
		<div className="search-bar" style={backgroundSearch}>
			<input
				type="text"
				placeholder="Pesquisar Equipamento"
				style={backgroundInput}
				onChange={handleInputChange}
			/>
			<button>
				<img src={searchBar.lupa} alt="lupa" />
			</button>
		</div>
	);
};

export default SearchBar;
