import { Component, Input } from '@angular/core';

@Component({
  selector: 'blockui',
  templateUrl: './blockui.component.html',
  styleUrls: ['./blockui.component.css']
})
export class BlockuiComponent {
  @Input() showBlockui: boolean = false;
  @Input() target: string = '';
}
