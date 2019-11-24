import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from 'src/app/users/users.component';
import { PostsComponent } from 'src/app/posts/posts.component';
import { ProductsComponent } from 'src/app/products/products.component';
import { TestsComponent } from 'src/app/tests/tests.component';

const routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'users', component: UsersComponent },
    { path: 'posts', component: PostsComponent },
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
