import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import compression from 'compression'

import '@shared/infra/typeorm'
import '@shared/container'

import routes from '@shared/infra/http/routes'
import uploadConfig from '@config/upload'

import AppError from '@shared/errors/AppError'

const app = express()

app.use(express.json())
app.use(compression())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(routes)
app.use('/files', express.static(uploadConfig.uploadFolder))
app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		console.log(err)

		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				status: 'error',
				message: err.message,
			})
		}

		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
		})
	}
)

const PORT = 3333

app.listen(PORT, () => console.log(`Server running on port: ${PORT} ☕️`))
