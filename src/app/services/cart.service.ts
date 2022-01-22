import { Injectable } from '@angular/core'
import { NGXLogger } from 'ngx-logger'
import { NotificationService } from './alerts.service'
import { OrderCart } from '../models/order'
import { Product } from '../models/product'

@Injectable({
    providedIn: 'root'
})
export class CartService {
    product_count: number

    k: string = 'cart'

    constructor(private logger: NGXLogger, private alert: NotificationService) {
        this.product_count = 0
    }

    init() {
        let items = this.get()
        if (items) {
            this.product_count = items.filter((i) => !i.deleted).length
        } else {
            this.product_count = 0
        }
        this.logger.info(items)
        //this.event_update.emit(items)
    }

    get(): OrderCart[] {
        try {
            return JSON.parse(<string>localStorage.getItem(this.k))
        } catch (e) {
            this.logger.error('Error getting data from localStorage', e)
            return []
        }
    }

    set(o: OrderCart[]): void {
        try {
            this.logger.info('Setting value in localstorage product')
            localStorage.setItem(this.k, JSON.stringify(o))
        } catch (e) {
            this.logger.error('Error saving to localStorage', e)
        }
    }

    add(p: Product, q: HTMLSelectElement) {
        const order: OrderCart = {
            product_id: p.id,
            product_name: p.nm,
            product_price: p.price,
            product_url: p.url,
            product_total: +(p.price * parseInt(q.value)).toFixed(2),
            quantity: parseInt(q.value),
            deleted: false
        }

        if (!order.quantity) {
            this.alert.showError('Please select the quantity of product before adding.', 'Incorrect Quantity')
            this.logger.error('incorrect quantity selected for product')
            return
        }

        let items = this.get()
        if (items) {
            const index = items.findIndex((item) => item.product_id === order.product_id)
            if (index !== -1) {
                items[index].quantity = order.quantity
                items[index].product_total = +(p.price * order.quantity).toFixed(2)
                items[index].deleted = false
            } else {
                items.push(order)
            }
        } else {
            items = [order]
        }

        this.set(items)
        this.logger.info(items)
        this.product_count = items.filter((i) => !i.deleted).length
        //this.event_update.emit(items)
        this.logger.info(`The cart has been updated.`)
        this.alert.showInfo(`The cart has been updated.`, `Cart Updated`)
    }

    delete(id: number) {
        let items = this.get()
        const index = items.findIndex((item) => item.product_id === id)
        if (index !== -1) {
            items[index].deleted = true
        }

        items = items.filter((i) => !i.deleted)
        this.set(items)
        this.product_count = items.length
        //this.event_update.emit(items)
        this.logger.warn(`A product has been removed from cart.`)
        this.alert.showWarning(`A product has been removed from cart.`, `Cart Updated`)
    }

    deleteall() {
        localStorage.removeItem(this.k)
        let items = this.get()
        if (items) {
            this.product_count = items.filter((i) => !i.deleted).length
        } else {
            this.product_count = 0
        }
        this.logger.info(items)
        //this.event_update.emit(items)
        this.logger.info(`The cart items have been cleared.`)
        this.alert.showInfo(`The cart items have been cleared.`, `Cart Cleared`)
    }
}
