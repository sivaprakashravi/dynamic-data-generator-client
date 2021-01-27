import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
    types: Array<any>;
    listType: Array<any>;
    booleanList: Array<any>;
    @Input() type: string;
    @Input() dataType: string;
    @Input() length: string;
    @Input() list: Array<any> = [];
    @Output() updatedList = new EventEmitter();

    constructor() { }

    ngOnChanges() {
    }

    ngOnInit() {
        this.types = [
            {
                type: 'Boolean',
                createModel: 'boolean'
            },
            {
                type: 'Name',
                createModel: 'name'
            },
            {
                type: 'Number',
                createModel: 'number'
            },
            {
                type: 'Array',
                createModel: 'array'
            },
            {
                type: 'Object',
                createModel: 'object'
            },
            {
                type: 'Random String',
                createModel: 'string'
            },
            {
                type: 'Null',
                createModel: 'null'
            }
        ];
        this.listType = [
            {
                name: 'Array',
                active: true
            }, {
                name: 'Object',
                active: false
            }
        ];

        this.booleanList = [
            {
                name: 'True',
                value: 'true'
            },
            {
                name: 'False',
                value: 'false'
            },
            {
                name: 'Random',
                value: 'Random'
            }
        ];
    }

    toggleType(selectedType) {
        (this.listType).forEach((type) => {
            type.active = false;
        });
        selectedType.active = true;
        this.dataType = selectedType.name;
        this.fireModelChange(this.length);
    }
    updateModel(event, item) {
        if (event === 'array' || event === 'object') {
            !item.list ? item.list = [] : item.list = item.list;
        } else {
            delete item.list;
        }
        item.value = null;
        this.fireModelChange(this.length);
    }
    addList(list) {
        list.push({
            objectName: '',
            type: 'boolean',
            value: null,
            length: this.length
        });
        this.fireModelChange(this.length);
    }
    fireModelChange(length) {
        if (this.list && this.list.length) { this.list[0].length = length; }
        this.updatedList.emit({ 'list': this.list, 'length': this.length, 'type': this.dataType ? this.dataType : this.type });
    }
    numberOnly() {
        this.length = (this.length).replace(/[^\d]/g, '');
        this.fireModelChange(this.length);
    }

}
