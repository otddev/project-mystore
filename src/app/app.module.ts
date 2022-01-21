import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr'
import { AppRoutingModule } from './app-routing.module'
import { SafeUrl } from './services/safeurl.service'
import { AppComponent } from './app.component'
import { AuthInterceptor, ErrorCatchingInterceptor } from './interceptors/http.interceptor'
import { LoginComponent } from './components/login/login.component'
import { CatalogComponent } from './components/catalog/catalog.component'
import { ProductComponent } from './components/product/product.component'
import { NotfoundComponent } from './components/notfound/notfound.component'
import { CartComponent } from './components/cart/cart.component'
import { SuccessComponent } from './components/success/success.component'

@NgModule({
    declarations: [AppComponent, SafeUrl, LoginComponent, CatalogComponent, ProductComponent, NotfoundComponent, CartComponent, SuccessComponent],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LoggerModule.forRoot({
            level: NgxLoggerLevel.TRACE,
            serverLogLevel: NgxLoggerLevel.ERROR,
            disableConsoleLogging: false
        }),
        ToastrModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorCatchingInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
