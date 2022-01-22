import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from '../../services/api.service'
import { NotificationService } from '../../services/alerts.service'
import { NGXLogger } from 'ngx-logger'
import { Product } from '../../models/product'
import { CartService } from '../../services/cart.service'

@Component({
    selector: 'app-catalogitem',
    templateUrl: './catalogitem.component.html',
    styleUrls: ['./catalogitem.component.css'],
    providers: [NGXLogger]
})
export class CatalogitemComponent {
    counter(i: number) {
        return new Array(i + 1)
    }

    constructor(private logger: NGXLogger, public router: Router, public api: ApiService, private alert: NotificationService, public cart: CartService) {}

    @Input() product!: Product
}
