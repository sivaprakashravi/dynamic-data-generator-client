import { Component, OnInit } from '@angular/core';
import { GenerateService } from './services/generate.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private service: GenerateService) {

  }
  title = 'dynamic-data-generator';
  types: Array<any>;
  list: Array<any> = [];
  Updatedlist: Array<any> = [];
  parentLength = 0;
  json;
  id;

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
        type: 'Number',
        createModel: 'number'
      }
    ];
  }

  listChanged(list) {
    const uList = this.formatLength(list, false);
    // console.log(uList);
    this.Updatedlist = uList;
  }

  formatLength(list, l2) {
    const lx = list;
    if (lx && lx.list) {
      (lx.list).forEach((l) => {
        if (l2) {
          lx.length = l.length;
        }
        if (l.type === 'array' && l.list) {
          this.formatLength(l, true);
        }
      });
    }
    return list;
  }

  validateName(list, l2) {
    const lx = list;
    var isValid = true;
    if (lx && lx.list) {
      (lx.list).forEach((l) => {
        l.invalid = false;
        if (!l.objectName) {
          isValid = false;
          l.invalid = true;
        }
        if (l.type === 'array' && l.list) {
          this.validateName(l, true);
        }
      });
    }
    this.list = lx.list;
    return isValid;

  }

  resetList() {
    this.list = [];
    this.parentLength = 0;
  }

  generateList() {
    const self = this;
    this.id = '';
    this.json = [];
    if (self.Updatedlist && self.validateName(self.Updatedlist, false)) {
      self.generateService(self.Updatedlist);
    } else {
      console.log('invalid format');
    }
  }

  generateService(list) {
    this.service.generate(list).subscribe((response: any) => {
      console.log(response);
      this.id = response.id;
      this.json = response.data;
    },
    (error) => {
      console.log(error);
    });
  }

  getJson() {
    this.service.getData(this.id).subscribe((response: any) => {
      console.log(response);
      this.id = response.id;
      this.json = response.data;
    },
    (error) => {
      console.log(error);
    });
  }

  copyMessage(val: string){
    let clipboard = this.service.copyToClipBoard(val);
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = clipboard;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
