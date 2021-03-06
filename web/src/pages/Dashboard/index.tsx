import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { isToday, format, parseISO, isAfter } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FiPower, FiClock } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import { useAuth } from '../../context/AuthContext'

import apiClient from '../../services/apiClient'
import logo from '../../assets/logo.svg'
import defaultAvatar from '../../assets/default-avatar.png'

import months from '../../data/months'
import weekDays from '../../data/weekDays'

import { Appointment, MonthAvailabilityItem } from './types'

import {
	Container,
	Header,
	HeaderContent,
	Profile,
	Content,
	Schedule,
	NextAppointment,
	Section,
	Appointment as AppointmentItem,
	Calendar,
} from './styles'

const Dashboard: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [currentMonth, setCurrentMonth] = useState(new Date())
	const [monthAvailability, setMonthAvailability] = useState<
		MonthAvailabilityItem[]
	>([])
	const [appointments, setAppointments] = useState<Appointment[]>([])

	const { signOut, user } = useAuth()

	const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
		if (modifiers.available && !modifiers.disabled) {
			setSelectedDate(day)
		}
	}, [])

	const handleMonthChange = useCallback((month: Date) => {
		setCurrentMonth(month)
	}, [])

	useEffect(() => {
		apiClient
			.get(`/providers/${user.id}/month-availability`, {
				params: {
					month: currentMonth.getMonth() + 1,
					year: currentMonth.getFullYear(),
				},
			})
			.then(response => {
				setMonthAvailability(response.data)
			})
	}, [currentMonth, user.id])

	useEffect(() => {
		apiClient
			.get<Appointment[]>('/appointments/me', {
				params: {
					day: selectedDate.getDate(),
					month: selectedDate.getMonth() + 1,
					year: selectedDate.getFullYear(),
				},
			})
			.then(response => {
				const appointmentsFormatted = response.data.map(appointment => ({
					...appointment,
					hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
				}))

				setAppointments(appointmentsFormatted)
			})
	}, [selectedDate])

	const disabledDays = useMemo(() => {
		const dates = monthAvailability
			.filter(monthDay => monthDay.available === false)
			.map(monthDay => {
				return new Date(
					currentMonth.getFullYear(),
					currentMonth.getMonth(),
					monthDay.day
				)
			})

		return dates
	}, [currentMonth, monthAvailability])

	const selectedDateAsText = useMemo(() => {
		// eslint-disable-next-line quotes
		return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR })
	}, [selectedDate])

	const selectedWeekDay = useMemo(() => {
		return format(selectedDate, 'cccc', { locale: ptBR })
	}, [selectedDate])

	const mourningAppointments = useMemo(() => {
		return appointments.filter(
			appointment => parseISO(appointment.date).getHours() < 12
		)
	}, [appointments])

	const afternoonAppointments = useMemo(() => {
		return appointments.filter(
			appointment => parseISO(appointment.date).getHours() >= 12
		)
	}, [appointments])

	const nextAppointment = useMemo(() => {
		return appointments.find(appointment =>
			isAfter(parseISO(appointment.date), new Date())
		)
	}, [appointments])

	return (
		<Container>
			<Header>
				<HeaderContent>
					<img src={logo} alt="GoBarber" />
					<Profile>
						<img
							src={user.avatar_url || defaultAvatar}
							alt={`Perfil de ${user.name}`}
						/>
						<div>
							<span>Bem-vindo (a)</span>
							<Link to="/profile">
								<strong>{user.name}</strong>
							</Link>
						</div>
					</Profile>
					<button type="button" onClick={signOut}>
						<FiPower />
					</button>
				</HeaderContent>
			</Header>
			<Content>
				<Schedule>
					<h1>Horários agendados</h1>
					<p>
						{isToday(selectedDate) && <span>Hoje</span>}
						<span>{selectedDateAsText}</span>
						<span>{selectedWeekDay}</span>
					</p>
					{isToday(selectedDate) && nextAppointment && (
						<NextAppointment>
							<strong>Agendamento a seguir</strong>
							<div>
								<img
									src={nextAppointment.user.avatar_url}
									alt={nextAppointment.user.name}
								/>
								<strong>{nextAppointment.user.name}</strong>
								<span>
									<FiClock />
									{nextAppointment.hourFormatted}
								</span>
							</div>
						</NextAppointment>
					)}
					<Section>
						<strong>Manhã</strong>
						{mourningAppointments.length === 0 ? (
							<p>Nenhum agendamento neste período</p>
						) : (
							mourningAppointments.map(appointment => (
								<AppointmentItem key={appointment.id}>
									<span>
										<FiClock />
										{appointment.hourFormatted}
									</span>
									<div>
										<img
											src={appointment.user.avatar_url}
											alt={appointment.user.name}
										/>
										<strong>{appointment.user.name}</strong>
									</div>
								</AppointmentItem>
							))
						)}
					</Section>
					<Section>
						<strong>Tarde</strong>
						{afternoonAppointments.length === 0 ? (
							<p>Nenhum agendamento neste período</p>
						) : (
							afternoonAppointments.map(appointment => (
								<AppointmentItem key={appointment.id}>
									<span>
										<FiClock />
										{appointment.hourFormatted}
									</span>
									<div>
										<img
											src={appointment.user.avatar_url}
											alt={appointment.user.name}
										/>
										<strong>{appointment.user.name}</strong>
									</div>
								</AppointmentItem>
							))
						)}
					</Section>
				</Schedule>
				<Calendar>
					<DayPicker
						fromMonth={new Date()}
						disabledDays={[
							{
								daysOfWeek: [0, 6],
							},
							...disabledDays,
						]}
						modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
						selectedDays={selectedDate}
						onDayClick={handleDateChange}
						onMonthChange={handleMonthChange}
						weekdaysShort={weekDays}
						months={months}
					/>
				</Calendar>
			</Content>
		</Container>
	)
}

export default Dashboard
