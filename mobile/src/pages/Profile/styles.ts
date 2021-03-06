import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const Container = styled.View`
	flex: 1;
	justify-content: center;
	padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`

export const Title = styled.Text`
	font-size: 20px;
	color: ${props => props.theme.colors.tertiary};
	font-family: ${props => props.theme.fonts.primary.medium};
	margin: 24px 0;
`

export const UserAvatarButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
	width: 186px;
	height: 186px;
	border-radius: 98px;
	margin-top: 64px;
	align-self: center;
`

export const BackButton = styled.TouchableOpacity`
	margin: 140px 0 -100px;
	z-index: 1;
`
