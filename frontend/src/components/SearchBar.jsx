import React from "react";
import "../pages/home/Home.css";

const SearchBar = ({ size, backgroundColor}) => {
    const backgroundSearch = {
        width: size,
        backgroundColor: backgroundColor || "#101F78"
    };

    const backgroundInput = {
        backgroundColor: backgroundColor || "#101F78"
    }
    
    return (
        <div className="search-bar" style={backgroundSearch}>
		    <input type="text" placeholder="Pesquisar Equipamento" style={backgroundInput} />
    	    <button>
				<img src="./src/assets/search.png" alt="lupa" />
			</button>
		</div>
    )
}

export default SearchBar