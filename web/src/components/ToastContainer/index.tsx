import React from 'react'
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'

import { Container, Toast } from './styles'

const ToastContainer: React.FC = () => {
	return (
		<Container>
			<Toast type="success" hasDescription={false}>
				<FiAlertCircle size={20} />
				<div>
					<strong>Errror meo deus</strong>
					<p>Nao foi possivel fazer login</p>
				</div>
				<button type="button">
					<FiXCircle size={18} />
				</button>
			</Toast>
			<Toast type="error" hasDescription>
				<FiAlertCircle size={20} />
				<div>
					<strong>Errror meo deus</strong>
					<p>Nao foi possivel fazer login</p>
				</div>
				<button type="button">
					<FiXCircle size={18} />
				</button>
			</Toast>
		</Container>
	)
}

export default ToastContainer