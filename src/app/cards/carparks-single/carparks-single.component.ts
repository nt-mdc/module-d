import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carparks-single',
  imports: [],
  templateUrl: './carparks-single.component.html',
  styleUrl: './carparks-single.component.css',
})
export class CarparksSingleComponent {
  @Input() carpark: any;
}
