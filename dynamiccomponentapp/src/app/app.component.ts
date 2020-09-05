import { Component } from '@angular/core';
import { ModalcontainerComponent } from './modalcontainer/modalcontainer.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dynamiccomponentapp';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const myDialog = this.dialog.open(ModalcontainerComponent, {
      data: {
        title: this.title,
        component: TestcomponentComponent,
        text: 'some text.',
        value: 20
      },
    });

    myDialog.afterOpened().subscribe(() => {
      myDialog.componentInstance['myEvent']
        .subscribe( eventResult => {
          console.log('result of a triggered event from host component', eventResult);
        })
    });
  }
}
