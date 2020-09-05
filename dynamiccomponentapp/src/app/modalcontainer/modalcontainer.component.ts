import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  OnDestroy,
  EventEmitter} from '@angular/core';
  import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modalcontainer',
  templateUrl: './modalcontainer.component.html',
  styleUrls: ['./modalcontainer.component.css']
})
export class ModalcontainerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef;
  componentRef: ComponentRef<any>;
  title: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ModalcontainerComponent>,
  public resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.generateHostComponent();
  }

  generateHostComponent() {
    const { title, component, ...inputOptions } = this.data;
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.vcRef.createComponent(factory);
    const hostComponent = this.componentRef.instance;

    // Pass inputs if any.
    if (inputOptions) {
      Object.keys(inputOptions).forEach(inputName => {
        hostComponent[inputName] = inputOptions[inputName];
      })
    }

    // Listen Ouput events.
    Object.keys(hostComponent)
      .filter(componentProperty => hostComponent[componentProperty] instanceof EventEmitter)
      .forEach(eventName => {
        this[eventName] = new EventEmitter()
        this[`${eventName}_subscriber`] = hostComponent[eventName].subscribe(data => {
          this[eventName].emit(data);
        })
      })
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
