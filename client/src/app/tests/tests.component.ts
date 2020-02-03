import { Component, OnInit } from '@angular/core';
import { IAppState, ReduxTable } from '../app.state';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs';
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
    this.tests = [
      {id: 1, name: 'abc'},
      {id: 2, name: 'xyz'},
      {id: 3, name: 'zzzz'},
      {id: 4, name: 'vip'},
    ];
  }

  ngDoCheck() {
    console.log('run ngDoCheck');
  }
  update() {
    this.tests[0].id = this.tests[0].id + 1;
    this.tests[0].name = this.tests[0].id.toString();
  }

  replace() {
    this.tests[0] = {
      id: 2000,
      name: '2000000'
    };
  }

}
