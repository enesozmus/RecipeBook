import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  // Bu bilgiyi root component'e yollayacağız.
  // <app-nav-bar></app-nav-bar>  'a git.
  @Output ('navLinkTransporter') selectedOption = new EventEmitter<string>();

  onSelect(selectedLink: string) {
    this.selectedOption.emit(selectedLink);
  }

}
