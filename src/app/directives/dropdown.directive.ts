import { Directive, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

 // private isOpen: boolean = false;

  /**
    * @HostBinding('class.show') isOpen: boolean = false;
    * @HostListener('click') toggleOpen() {
    *   this.isOpen = !this.isOpen;
    * }
   */

   @HostBinding('class.show') isOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
/*
  @HostListener('document:click') toggleOpen() {

    const dropdown = this.elementRef.nativeElement.nextElementSibling;

    if (!this.isOpen)
    {
      this.renderer.addClass(dropdown, 'show');
    }
    else
    {
      this.renderer.removeClass(dropdown, 'show');
    }
    this.isOpen = !this.isOpen;
  }
*/
}