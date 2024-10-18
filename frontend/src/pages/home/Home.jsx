import React from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";

const Home = () => {
	const location = useLocation();
	const { data } = location.state;

	return (
		<div className="home">
			<p className="titulo-home">GERENCIAMENTO DE TEMPERATURA</p>
			<section className="menu-bar">
				<div className="perfil-user">
					<img src="./src/assets/profile-user.png" alt="Perfil" />
					<p>{data?.login.nome}</p>
				</div>
				<div className="search-bar">
					<input type="text" placeholder="Pesquisar Equipamento" />
					<button>
						{" "}
						<img src="./src/assets/search.png" alt="lupa" />
					</button>
				</div>
			</section>
			<section className="background-sensor">
				<div className="menu-sensor">
					<div className="card-sensor">
						<p>EQ-10000</p>
						<div className="dados-sensor">
							<p>Data e hora da última captura</p>
							<div>
								<p>15/02/2024</p>
								<p>01:30:00</p>
							</div>
						</div>
						<div className="dados-sensor">
							<p>Temperatura Atual</p>
							<div>
								<p>89.42°C</p>
							</div>
						</div>
						<button>Ver Mais</button>
					</div>
					<div className="card-sensor"></div>
					<div className="card-sensor"></div>
					<div className="card-sensor"></div>
					<div className="card-sensor"></div>
					<div className="card-sensor"></div>
					<div className="card-sensor"></div>
					<div className="card-sensor"></div>
					<div className="card-sensor"></div>
					<div className="card-sensor"></div>
					<div className="card-sensor"></div>
					<div className="card-sensor"></div>
				</div>
			</section>
		</div>
	);
};

export default Home;
