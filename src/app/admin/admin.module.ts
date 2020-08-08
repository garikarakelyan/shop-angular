import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component'
import { LoginPageComponent } from './login-page/login-page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderProductComponent } from './order-product/order-product.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
 
@NgModule({
    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: AdminLayoutComponent,
                children: [
                    {
                        path: '',
                        redirectTo: '/admin/login',
                        pathMatch: 'full'
                    },
                    {
                        path: 'login',
                        component: LoginPageComponent
                    },
                    {
                        path: 'dashboard',
                        component: DashboardComponent
                    },
                    {
                        path: 'product/:id/edit',
                        component: EditProductComponent
                    },
                    {
                        path: 'add',
                        component: AddProductComponent
                    },
                    {
                        path: 'order',
                        component: OrderProductComponent
                    },
                ]
            },
        ])
     ],
    exports: [RouterModule],
    providers: [],
    declarations: [AddProductComponent, DashboardComponent, EditProductComponent, OrderProductComponent, AdminLayoutComponent, LoginPageComponent],
})
export class AdminModule {}