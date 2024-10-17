import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const LOGIN_FUNCIONARIO = gql`
	query Login($email: String!, $senha: String!) {
		login(email: $email, senha: $senha) {
			idFuncionario
			nome
		}
	}
`;

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loginFuncionario, { data, error, loading }] = useLazyQuery(LOGIN_FUNCIONARIO);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data } = await loginFuncionario({ variables: { email, senha: password } });

		if (data) {
			navigate('/home', { state: { nome: data.login.nome } });
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit} className="form">
				<p>Faça Login</p>

				<div className="inputGroup">
					<label htmlFor="email">Email:</label>
					<div className="inputWrapper">
						<img
							src="./src/assets/user.png"
							alt="Email Icon"
							className="inputIcon"
						/>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="input"
						/>
					</div>

					<label htmlFor="password">Senha:</label>
					<div className="inputWrapper">
						<img
							src="./src/assets/padlock.png"
							alt="Email Icon"
							className="inputIcon"
						/>
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="input"
						/>
						<img
							src={showPassword ? "./src/assets/eye.png" : "./src/assets/hidden.png"}
							alt="Toggle Password Visibility"
							className="eyeIcon"
							onClick={togglePasswordVisibility}
						/>
					</div>
				</div>

				{data && <span className="mensagem">Login bem-sucedido</span>}

				{error && (
					<span className="mensagem erro">E-mail ou senha incorretas</span>
				)}

				<button type="submit" className="button">
					{loading ? "Entrando..." : "Entrar"}
				</button>
			</form>
		</div>
	);
};

export default Login;
