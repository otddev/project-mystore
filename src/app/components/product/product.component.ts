import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from '../../services/api.service'
import { NotificationService } from '../../services/alerts.service'
import { NGXLogger } from 'ngx-logger'
import { Product } from '../../models/product'
import { CartService } from '../../services/cart.service'

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
    providers: [NGXLogger]
})
export class ProductComponent implements OnInit {
    product_id: number = 0

    product!: Product

    counter(i: number) {
        return new Array(i + 1)
    }

    constructor(private active: ActivatedRoute, private logger: NGXLogger, public router: Router, public api: ApiService, public alert: NotificationService, public cart: CartService) {}

    ngOnInit(): void {
        this.product_id = this.active.snapshot.paramMap.get('id') ? parseInt(this.active.snapshot.paramMap.get('id') as string) : 0

        this.api.getProducts().subscribe(
            (data) => {
                this.product = data.filter((d) => d.id === this.product_id)[0]
                if (!this.product) {
                    this.alert.showError('Product Not Exist', 'Incorrect Product ID')
                    this.router.navigate(['/catalog'])
                }
            },
            (err) => {
                this.alert.showError(err.message, 'Bad Request')
                this.logger.error(err)
                this.router.navigate(['/catalog'])
            }
        )
    }

    add(p: Product, q: HTMLSelectElement): void {
        this.cart.add(p, q)
        this.router.navigate(['/catalog'])
    }
}
