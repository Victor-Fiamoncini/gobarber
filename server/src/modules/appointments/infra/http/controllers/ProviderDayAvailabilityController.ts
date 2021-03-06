import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

class ProviderDayAvailabilityController {
	public async index(request: Request, response: Response) {
		const { provider_id } = request.params
		const { day, month, year } = request.query

		const listProviderDayAvailabilityService = container.resolve(
			ListProviderDayAvailabilityService
		)

		const availabilities = await listProviderDayAvailabilityService.execute({
			provider_id,
			day: Number(day),
			month: Number(month),
			year: Number(year),
		})

		return response.status(200).json(availabilities)
	}
}

export default ProviderDayAvailabilityController
