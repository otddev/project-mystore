export interface OrderCart {
    product_id: number
    product_name: string
    product_price: number
    product_url: string
    product_total: number
    quantity: number
    deleted: boolean
}

export interface Order {
    id: number
    user_id: number
    address: string
    credit_card: string
    status: number
    total: number
}

export interface OrderRequest {
    user_id: number
    address: string
    credit_card: string
    status: number
    total: number
}

export interface OrderProduct {
    order_id: number
    product_id: number
    quantity: number
    total: number
}
