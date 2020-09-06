import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcontainerComponent } from './modalcontainer.component';
import { Component, Input, EventEmitter, Output, ComponentRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-host',
  template: 'container'
})
class HostComponent{
  @Input() myInput: string;
  @Output() myEvent = new EventEmitter();
}

const data = {
  title: 'Modal Title',
  component: HostComponent,
  myInput: 'Hello'
};

describe('ModalcontainerComponent', () => {
  let component: ModalcontainerComponent;
  let fixture: ComponentFixture<ModalcontainerComponent>;
  let hostComponentRef: ComponentRef<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcontainerComponent, HostComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ HostComponent ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostComponentRef = fixture.componentInstance.componentRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.title).toBe(data.title);
  });

  it('should receive host component inputs', () => {
    expect(hostComponentRef.instance.myInput).toBe(data.myInput);
  });
  
  it('should emit event', () => {
    const expectedData = 'Event triggered';
    const spy = spyOn(component['myEvent'], 'emit');
    hostComponentRef.instance.myEvent.emit(expectedData);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(expectedData);
  });
});
