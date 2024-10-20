import React from "react";
import "../pages/home/Home.css";

const Perfil = ({ nomeUsuario, profileUser, position, size, left }) => {
    const usuario = {
        nome: nomeUsuario || "Administrador",
        profile: profileUser || "./src/assets/profile-user.png"
    };

    const styles = {
        position: position,
        width: size,
        left: left,
    }
    return (
        <div className="perfil-user" style={ styles }>
			<img src={usuario.profile} alt="Perfil" />
			<p>{usuario.nome}</p>
		</div>
    )
}

export default Perfil