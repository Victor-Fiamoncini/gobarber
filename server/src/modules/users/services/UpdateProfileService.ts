import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import AppError from '@shared/errors/AppError'

interface IRequest {
	user_id: string
	name: string
	email: string
	old_password?: string
	password?: string
}

@injectable()
class UpdateProfileService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	) {}

	public async execute({
		user_id,
		name,
		email,
		old_password,
		password,
	}: IRequest) {
		const user = await this.usersRepository.findById(user_id)

		if (!user) {
			throw new AppError('User not found')
		}

		const userWithUpdatedEmail = await this.usersRepository.findByEmail(email)

		if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
			throw new AppError('E-mail already used')
		}

		user.name = name
		user.email = email

		if (password && !old_password) {
			throw new AppError('Old password must be provided')
		}

		if (password && old_password) {
			const checkOldPassword = await this.hashProvider.compareHash(
				old_password,
				user.password
			)

			if (!checkOldPassword) {
				throw new AppError('Old password does not match')
			}

			user.password = await this.hashProvider.generateHash(password)
		}

		await this.usersRepository.save(user)

		return user
	}
}

export default UpdateProfileService
