import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
	const location = useLocation();
	const nome = location.state?.nome || "Visitante";

	return (
		<div className="home-container">
			<h1>Bem-vindo, {nome}!</h1>
		</div>
	);
};

export default Home;
