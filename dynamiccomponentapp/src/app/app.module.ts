import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalcontainerComponent } from './modalcontainer/modalcontainer.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    ModalcontainerComponent,
    TestcomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule
  ],
  entryComponents: [
    ModalcontainerComponent,
    TestcomponentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
