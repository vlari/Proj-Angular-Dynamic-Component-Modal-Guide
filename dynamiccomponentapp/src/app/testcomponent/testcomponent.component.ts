import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.css']
})
export class TestcomponentComponent implements OnInit {
  @Input() text: string;
  @Input() value: number;
  @Output() myEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onBtnClick(): void {
    this.myEvent.emit('hello from inside');
  }

  ngOnDestroy(): void {
  }
}
