import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from '../../services/api.service'
import { NotificationService } from '../../services/alerts.service'
import { NGXLogger } from 'ngx-logger'
import { CartService } from '../../services/cart.service'
import { AuthService } from '../../services/auth.service'
import { OrderCart, OrderProduct, OrderRequest } from '../../models/order'
import { User } from '../../models/user'

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    providers: [NGXLogger]
})
export class CartComponent implements OnInit {
    order_cart: OrderCart[] = []

    order: OrderRequest

    order_total: number

    current_user: { id: number; full_name: string; email: string }

    counter(i: number) {
        return new Array(i + 1)
    }

    update(): void {
        this.order_cart = this.cart.get()
        if (this.order_cart) {
            this.order_total = +this.order_cart.reduce((acc, curr) => acc + curr.product_total, 0).toFixed(2)
        }
    }

    constructor(private active: ActivatedRoute, private logger: NGXLogger, public router: Router, public api: ApiService, public alert: NotificationService, public cart: CartService, public auth: AuthService) {
        this.order_total = 0.0
        this.current_user = { id: 0, full_name: 'Not Available', email: 'Not Available' }
        this.order = {
            address: '',
            credit_card: '',
            total: 0.0,
            user_id: 0,
            status: 3
        }
    }

    ngOnInit(): void {
        if (this.auth.logged) {
            const u: User | null = this.auth.getuser()
            if (u) {
                this.current_user.id = u.id
                this.current_user.full_name = u.firstname + ' ' + u.lastname
                this.current_user.email = u.email
            }
        }
        this.update()
    }

    delete(id: number): void {
        this.cart.delete(id)
        this.update()
    }

    deleteall(): void {
        this.cart.deleteall()
        this.update()
    }

    process(): void {
        this.order.user_id = this.current_user.id
        this.order.total = this.order_total

        this.api.createOrder(this.order).subscribe(
            (res) => {
                this.logger.info(res)
                for (let c of this.order_cart) {
                    const op: OrderProduct = {
                        product_id: c.product_id,
                        quantity: c.quantity,
                        total: c.product_total,
                        order_id: res.id
                    }
                    this.api.createOrderProduct(op, op.order_id).subscribe(
                        (res2) => {
                            this.logger.info(res2)
                        },
                        (err) => {
                            this.alert.showError(err.message, 'Invalid Order Product Creation')
                            this.logger.error(err)
                            return
                        }
                    )
                }

                this.alert.showSuccess('The order has been initiated.', 'Purchase Successful')
                this.logger.info('The order has been initiated.')
                this.deleteall()
                this.router.navigate(['/success'])
            },
            (err) => {
                this.alert.showError(err.message, 'Invalid Order Creation')
                this.logger.error(err)
                return
            }
        )
    }
}
