import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
	const location = useLocation();
	const { data } = location.state;

	return (
		<div>
			<h1>Bem-vindo {data?.login.nome}!</h1>
			<p>Você está logado na empresa ID: {data?.login.idEmpresa}</p>
		</div>
	);
};

export default Home;
