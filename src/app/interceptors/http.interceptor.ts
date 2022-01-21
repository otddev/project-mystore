import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent, HttpClient } from '@angular/common/http'
import { NGXLogger } from 'ngx-logger'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AuthService } from '../services/auth.service'

export interface ErrorType {
    code: number
    status: string
    message: string
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.auth.gettoken()
        req = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + authToken
            }
        })
        return next.handle(req)
    }
}

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
    constructor(private logger: NGXLogger, private http: HttpClient) {}

    // eslint-disable-next-line class-methods-use-this
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let err: ErrorType
                this.logger.error(error)
                if (error.error instanceof ErrorEvent) {
                    err = { code: 500, status: 'Error', message: error.error.message }
                } else {
                    // @ts-ignore
                    err = { code: error.status, status: error.statusText, message: error.error.error }
                }
                return throwError(err)
            })
        )
    }
}
