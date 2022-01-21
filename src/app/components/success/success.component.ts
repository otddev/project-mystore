import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationService } from '../../services/alerts.service'
import { NGXLogger } from 'ngx-logger'

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.css'],
    providers: [NGXLogger]
})
export class SuccessComponent {
    constructor(private active: ActivatedRoute, private logger: NGXLogger, public router: Router, public alert: NotificationService) {}
}
