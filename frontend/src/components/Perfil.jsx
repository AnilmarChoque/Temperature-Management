import React from "react";
import "../pages/home/Home.css";

const Perfil = ({ nomeUsuario }) => {
    const usuario = {
        nome: nomeUsuario || "Administrador",
    };
    return (
        <div className="perfil-user">
			<img src="./src/assets/profile-user.png" alt="Perfil" />
			<p>{usuario.nome}</p>
		</div>
    )
}

export default Perfil