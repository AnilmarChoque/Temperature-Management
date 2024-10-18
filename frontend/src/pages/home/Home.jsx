import React from "react";
import { useLocation } from "react-router-dom";
import "./Home.css";
import Perfil from '../../components/Perfil';
import SearchBar from "../../components/SearchBar";
import SensorCard from "../../components/SensorCard";

const Home = () => {
	const location = useLocation();
	const { data } = location.state;

	return (
		<div className="home">
			<p className="titulo-home">GERENCIAMENTO DE TEMPERATURA</p>
			<section className="menu-bar">
				<Perfil nomeUsuario={data?.login.nome} />
				<SearchBar size="40%" backgroundColor="#101F78" />
			</section>
			<section className="background-sensor">
				<div className="menu-sensor">
					<SensorCard identificador={"EQ-10000"} />
					<SensorCard identificador={"EQ-10001"} />
					<SensorCard identificador={"EQ-10002"} />
					<SensorCard identificador={"EQ-10003"} />
					<SensorCard identificador={"EQ-10004"} />
					<SensorCard identificador={"EQ-10005"} />
					<SensorCard identificador={"EQ-10006"} />
					<SensorCard identificador={"EQ-10007"} />
					<SensorCard identificador={"EQ-10008"} />
					<SensorCard identificador={"EQ-10009"} />
					<SensorCard identificador={"EQ-10010"} />
					<SensorCard identificador={"EQ-10011"} />
				</div>
			</section>
		</div>
	);
};

export default Home;
