import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsComponent } from './tests/tests.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'users', component: UsersComponent },
    { path: 'tests', component: TestsComponent },
    { path: 'products', component: ProductsComponent },
    { path: '*', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: []
})
export class AppRoutingModule { }
