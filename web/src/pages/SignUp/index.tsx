import React from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'

import { Container, Content, Background } from './styles'

import logo from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

const SignUp: React.FC = () => {
	function handleSubmit(data: object) { }

	return (
		<Container>
			<Background />
			<Content>
				<img src={logo} alt="GoBarber" />
				<Form onSubmit={handleSubmit}>
					<h1>Faça seu cadastro</h1>
					<Input name="name" icon={FiUser} placeholder="Nome" />
					<Input name="email" icon={FiMail} placeholder="E-mail" />
					<Input name="password" icon={FiLock} placeholder="Senha" />
					<Button type="submit">Cadastrar</Button>
				</Form>
				<a href="/login">
					<FiArrowLeft />
					Voltar para logon
				</a>
			</Content>
		</Container>
	)
}

export default SignUp
