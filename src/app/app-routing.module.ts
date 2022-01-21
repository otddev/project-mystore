import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { CatalogComponent } from './components/catalog/catalog.component'
import { ProductComponent } from './components/product/product.component'
import { NotfoundComponent } from './components/notfound/notfound.component'
import { CartComponent } from './components/cart/cart.component'
import { SuccessComponent } from './components/success/success.component'

const routes: Routes = [
    { path: '', redirectTo: 'catalog', pathMatch: 'full' },
    { path: 'catalog', component: CatalogComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cart', component: CartComponent },
    { path: 'success', component: SuccessComponent },
    { path: '404', component: NotfoundComponent },
    { path: '**', redirectTo: '/404' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
