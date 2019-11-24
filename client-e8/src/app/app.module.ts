import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
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
