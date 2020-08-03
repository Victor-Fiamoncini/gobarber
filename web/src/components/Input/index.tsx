import React, { useEffect, useRef, InputHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons/lib'
import { useField } from '@unform/core'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
	const { fieldName, defaultValue, error, registerField } = useField(name)

	const inputRef = useRef(null)

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		})
	}, [fieldName, registerField])

	return (
		<Container>
			{Icon && <Icon size={20} />}
			<input ref={inputRef} {...rest} />
		</Container>
	)
}

export default Input