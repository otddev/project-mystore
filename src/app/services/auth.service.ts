import { Injectable } from '@angular/core'
import { User, UserRequest, UserResponse } from '../models/user'
import { NGXLogger } from 'ngx-logger'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { ApiService } from './api.service'
import { NotificationService } from './alerts.service'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, public router: Router, private logger: NGXLogger, private alert: NotificationService, private api: ApiService) {}

    signin(user: UserRequest) {
        // IMPORTANT: The following mechanism was added with the purpose to emulate user authentication since their no back-end on this project.

        this.logger.debug(user)
        if (user.username !== 'dummy') {
            this.alert.showError('The credentials provided are invalid.', 'Invalid Authentication')
            this.logger.error('The credentials provided are invalid.')
            return
        }

        return this.api.login().subscribe(
            (res: UserResponse) => {
                localStorage.setItem('token', res.token)
                this.api.getUsers().subscribe(
                    (data) => {
                        this.logger.debug(data)
                        localStorage.setItem('user', JSON.stringify(data))
                        this.router.navigate(['/catalog'])
                    },
                    (err) => {
                        this.alert.showError('The credentials provided are invalid.', 'Invalid Authentication')
                        this.logger.error(err)
                    }
                )
            },
            (err) => {
                this.alert.showError(err.message, 'Invalid Authentication')
                this.logger.error(err)
            }
        )
    }

    gettoken() {
        return localStorage.getItem('token')
    }

    getuser(): User | null {
        try {
            return JSON.parse(<string>localStorage.getItem('user'))
        } catch (e) {
            this.logger.error('Error getting data from localStorage', e)
            return null
        }
    }

    get logged(): boolean {
        return localStorage.getItem('token') !== null
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
}
