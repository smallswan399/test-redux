import { Component, OnInit } from '@angular/core';
import { Test } from '../test';
import { IAppState } from '../app.state';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  tests: Test[] = [
    new Test({
      id: 1,
      name: '1234'
    }),
    new Test({
      id: 2,
      name: 'dan nguyen'
    })
  ];

  @select(state => state.test.name) name$: Observable<string>;

  @select(state => state.test) test$: Observable<Test>;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.name$.subscribe(t => {
      alert((t));
    });

    // this.test$.subscribe(t => alert(JSON.stringify(t)));
  }

  clickHandler(i) {
    this.ngRedux.dispatch({
      type: 'ADD_TEST',
      payload: this.tests[i - 1]
    });
  }

}
