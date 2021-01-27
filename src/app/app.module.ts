import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxJsonViewerComponent } from 'ngx-json-viewer';

import { AppComponent } from './app.component';
import { ListComponent } from './shared/list/list.component';


import { HttpClientModule } from '@angular/common/http';
import { ViewerComponent } from './shared/viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ViewerComponent,
    NgxJsonViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
