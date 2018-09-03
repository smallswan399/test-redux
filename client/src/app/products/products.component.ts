import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/app.state';
import { Product } from '../post';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  id = 0;
  theFirstProduct: Product = new Product();
  products: Product[] = [];
  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.ngRedux.select(s => s.entities.products[0]).subscribe(p => {
      console.log('first item');
      if (p) {
        this.theFirstProduct = p;
      }
    });

    this.ngRedux.select(s => s.entities.products).subscribe(p => {
      console.log('list of items');
      if (p) {
        this.products = p;
      }
    });
  }

  add() {
    this.id++;
    this.ngRedux.dispatch({
      type: 'add_products',
      payload: [
        new Product({
          id: this.id,
          name: 'xxx'
        })
      ]
    });
  }

}
