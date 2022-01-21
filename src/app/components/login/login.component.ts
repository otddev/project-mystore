import { Component } from '@angular/core'
import { NGXLogger } from 'ngx-logger'
import { UserRequest } from '../../models/user'
import { AuthService } from '../../services/auth.service'
import { NotificationService } from '../../services/alerts.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    auth_request: UserRequest

    constructor(private logger: NGXLogger, private auth: AuthService, private alert: NotificationService, public router: Router) {
        this.auth_request = {
            username: '',
            password: ''
        }
    }

    onSubmit(): void {
        this.auth.signin(this.auth_request)
    }

    reloadPage(): void {
        window.location.reload()
    }
}
