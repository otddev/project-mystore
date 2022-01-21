import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from '../../services/api.service'
import { NotificationService } from '../../services/alerts.service'
import { NGXLogger } from 'ngx-logger'
import { Product } from '../../models/product'
import { CartService } from '../../services/cart.service'

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css'],
    providers: [NGXLogger]
})
export class CatalogComponent implements OnInit {
    products: Product[] = []

    counter(i: number) {
        return new Array(i + 1)
    }

    constructor(private logger: NGXLogger, public router: Router, public api: ApiService, private alert: NotificationService, public cart: CartService) {}

    ngOnInit(): void {
        this.api.getProducts().subscribe(
            (data) => {
                this.products = data
                this.logger.info(this.products)
            },
            (err) => {
                this.alert.showError(err.message, 'Bad Request')
                this.logger.error(err)
            }
        )
    }
}
