import { Component, OnInit } from '@angular/core'
import { NGXLogger } from 'ngx-logger'
import { NotificationService } from './services/alerts.service'
import { AuthService } from './services/auth.service'
import { Router } from '@angular/router'
import { CartService } from './services/cart.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [NGXLogger]
})
export class AppComponent implements OnInit {
    title = 'My Store'

    constructor(private logger: NGXLogger, public alert: NotificationService, public auth: AuthService, public router: Router, public cart: CartService) {
        this.logger.debug('Debug')
        this.logger.info('Info')
        this.logger.log('Default')
        this.logger.warn('Warning')
        this.logger.error('Error')
    }

    ngOnInit(): void {
        this.cart.init()
    }

    logout(): void {
        this.auth.logout()
        this.router.navigate(['/catalog'])
    }
}
