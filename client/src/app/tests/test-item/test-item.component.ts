import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Test } from 'src/app/test';

@Component({
  selector: 'app-test-item',
  templateUrl: './test-item.component.html',
  styleUrls: ['./test-item.component.css']
})
export class TestItemComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changed');
  }

  @Input() item: Test;
  constructor() { }

  ngOnInit() {
  }

}
