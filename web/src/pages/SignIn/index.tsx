import React from 'react'
import { FiLogIn } from 'react-icons/fi'

import { Container, Content, Background } from './styles'

import logo from '../../assets/logo.svg'

const SignIn: React.FC = () => {
	return (
		<Container>
			<Content>
				<img src={logo} alt="GoBarber" />
				<form>
					<h1>Faça seu logon</h1>
					<input type="email" name="email" placeholder="E-mail" />
					<input type="password" name="email" placeholder="Senha" />
					<button type="submit">Entrar</button>
					<a href="/forgot">Esqueci minha senha</a>
				</form>
				<a href="/login">
					<FiLogIn />
					Criar conta
				</a>
			</Content>
			<Background />
		</Container>
	)
}

export default SignIn