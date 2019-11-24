import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { IAppState, rootReducer, INITIAL_STATE } from './app.state';
import { PostsComponent } from './posts/posts.component';
import { ProductsComponent } from './products/products.component';
import { TestsComponent } from './tests/tests.component';
import { UsersComponent } from './users/users.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    ProductsComponent,
    TestsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, private devTools: DevToolsExtension) {
      let enhancers = [];
      if (devTools.isEnabled()) {
          enhancers = [...enhancers, devTools.enhancer()];
        }
      ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}
