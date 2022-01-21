export interface User {
    id: number
    username: string
    password: string
    firstname: string
    lastname: string
    email: string
}

export interface UserRequest {
    username: string
    password: string
}

export interface UserResponse {
    id: number
    token: string
}
