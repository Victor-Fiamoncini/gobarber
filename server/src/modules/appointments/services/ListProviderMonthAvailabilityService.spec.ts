import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService

describe('ListProviderMonthAvalability', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository()

		listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
			fakeAppointmentsRepository
		)
	})

	it('should be able to list the month availability from provider', async () => {
		await fakeAppointmentsRepository.create({
			provider_id: 'user',
			date: new Date(2020, 4, 20, 8, 0, 0),
		})

		await fakeAppointmentsRepository.create({
			provider_id: 'user',
			date: new Date(2020, 4, 20, 9, 0, 0),
		})

		await fakeAppointmentsRepository.create({
			provider_id: 'user',
			date: new Date(2020, 4, 20, 10, 0, 0),
		})

		await fakeAppointmentsRepository.create({
			provider_id: 'user',
			date: new Date(2020, 4, 20, 11, 0, 0),
		})

		await fakeAppointmentsRepository.create({
			provider_id: 'user',
			date: new Date(2020, 4, 20, 12, 0, 0),
		})

		await fakeAppointmentsRepository.create({
			provider_id: 'user',
			date: new Date(2020, 4, 20, 13, 0, 0),
		})

		await fakeAppointmentsRepository.create({
			provider_id: 'user',
			date: new Date(2020, 4, 20, 14, 0, 0),
		})

		await fakeAppointmentsRepository.create({
			provider_id: 'user',
			date: new Date(2020, 4, 20, 15, 0, 0),
		})

		await fakeAppointmentsRepository.create({
			provider_id: 'user',
			date: new Date(2020, 4, 20, 16, 0, 0),
		})

		await fakeAppointmentsRepository.create({
			provider_id: 'user',
			date: new Date(2020, 4, 20, 17, 0, 0),
		})

		await fakeAppointmentsRepository.create({
			provider_id: 'user',
			date: new Date(2020, 4, 21, 8, 0, 0),
		})

		const availabilities = await listProviderMonthAvailabilityService.execute({
			provider_id: 'user',
			year: 2020,
			month: 5,
		})

		console.log(availabilities)

		expect(availabilities).toEqual(
			expect.arrayContaining([
				{ day: 19, available: true },
				{ day: 20, available: false },
				{ day: 21, available: true },
				{ day: 22, available: true },
			])
		)
	})
})
