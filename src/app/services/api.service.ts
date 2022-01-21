import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { NGXLogger } from 'ngx-logger'
import { User, UserResponse } from '../models/user'
import { Product } from '../models/product'
import { Order, OrderProduct, OrderRequest } from '../models/order'

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private logger: NGXLogger, private http: HttpClient) {}

    // IMPORTANT: The following mechanism was added with the purpose to emulate API since their no back-end on this project.

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>('../../../assets/data/products.json')
    }

    getUsers(): Observable<User> {
        return this.http.get<User>('../../../assets/data/user.json')
    }

    createOrder(data: OrderRequest): Observable<Order> {
        this.logger.debug(data)
        return this.http.get<Order>('../../../assets/data/order.json')
    }

    createOrderProduct(data: OrderProduct, order_id: number): Observable<OrderProduct> {
        this.logger.debug(data, order_id)
        return this.http.get<OrderProduct>('../../../assets/data/order-product.json')
    }

    login(): Observable<UserResponse> {
        return this.http.get<UserResponse>('../../../assets/data/login.json')
    }
}
