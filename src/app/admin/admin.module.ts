import { SearchPipe } from './../shared/search.pipe';
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
import { AuthGuard } from '../shared/auth.guard'
import { QuillModule } from 'ngx-quill'

 
@NgModule({
    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
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
                        component: DashboardComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'product/:id/edit',
                        component: EditProductComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'add',
                        component: AddProductComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'orders',
                        component: OrderProductComponent,
                        canActivate: [AuthGuard]
                    },
                ]
            },
        ])
     ],
    exports: [RouterModule],
    providers: [],
    declarations: [
        AddProductComponent, 
        DashboardComponent, 
        EditProductComponent, 
        OrderProductComponent, 
        AdminLayoutComponent, 
        LoginPageComponent, 
        SearchPipe
    ],
})
export class AdminModule {}