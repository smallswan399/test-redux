import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from 'app/users/users.component';
import { PostsComponent } from 'app/posts/posts.component';
import { TestsComponent } from './tests/tests.component';

const routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'users', component: UsersComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'tests', component: TestsComponent },
    { path: '*', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: []
})
export class AppRoutingModule { }
