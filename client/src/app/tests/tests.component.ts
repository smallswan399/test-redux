import { Component, OnInit } from '@angular/core';
import { IAppState, ReduxTable } from '../app.state';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { normalizeTests, normalizeTest } from '../schema';
import { Test } from '../test';
import * as _ from 'lodash';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  id = 0;
  tests: Test[] = [];
  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux.select((state: IAppState) => _.values(state.entities.tests.list)).subscribe(t => {
      alert('new list arrived');
      this.tests = <Test[]>t;
    });

    this.ngRedux.select((state: IAppState) => state.entities.tests.list[1]).subscribe(t => {
      if (t) {
        alert('id = 1 changed');
      }
    });
  }

  clickHandler() {
    this.id++;
    const data = normalizeTest(new Test({id: this.id, name: Date().toString()}));
    const tests = data.entities.tests;
    this.ngRedux.dispatch({
      type: 'add_tests',
      payload: new ReduxTable({
        ids: Object.keys(tests).map(s => +s),
        list: tests
      })
    });
  }

  update() {
    const testO = new Test({
      id: 2,
      name: 'super mario'
    });

    const data = normalizeTest(testO);
    const tests = data.entities.tests;

    this.ngRedux.dispatch({
      type: 'add_or_update_tests',
      payload: new ReduxTable({
        ids: Object.keys(tests).map(s => +s),
        list: tests
      })
    });
  }

}
