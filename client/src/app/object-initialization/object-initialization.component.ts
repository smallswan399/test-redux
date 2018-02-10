import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-object-initialization',
    templateUrl: './object-initialization.component.html',
    styleUrls: ['./object-initialization.component.css']
})
export class ObjectInitializationComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        let o = {
            first: 'dan',
            last: 'nguyen',
            age: undefined,
            address: 'tset'
        };
        let name = new Name({
            first: 'a',
            last: 'b'
        });

        let aad = new Name(o);
        type t = keyof Name;
        let a:t;
        console.log(name);
        console.log(aad);
        console.log(Object.keys(new Name()));
    }

}

class Name {
    constructor(parameters?: Partial<Name>) {
        Object.assign(this, parameters);
    }
    first?: string;
    last?: string;
    address?: string;
}
