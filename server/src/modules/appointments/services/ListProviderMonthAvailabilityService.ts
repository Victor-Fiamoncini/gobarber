import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { getDaysInMonth, getDate, isAfter } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequest {
	provider_id: string
	month: number
	year: number
}

@injectable()
class ListProviderMonthAvailabilityService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository
	) {}

	public async execute({ provider_id, month, year }: IRequest) {
		const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
			{
				provider_id,
				month,
				year,
			}
		)

		const numberDaysInMonth = getDaysInMonth(new Date(year, month - 1))

		const eachDay = Array.from(
			{ length: numberDaysInMonth },
			(_, index) => index + 1
		)

		const availabilities = eachDay.map(day => {
			const compareDate = new Date(year, month - 1, day, 23, 59, 59)

			const appointmentsInDay = appointments.filter(appointment => {
				return getDate(appointment.date) === day
			})

			return {
				day,
				available:
					isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
			}
		})

		return availabilities
	}
}

export default ListProviderMonthAvailabilityService
