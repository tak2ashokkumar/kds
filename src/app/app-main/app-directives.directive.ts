import { Directive, Input, Output, OnInit, EventEmitter, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[manageActionIcon]'
})
export class HideElementByInputDirective implements OnInit {
  @Input() isShared: boolean;
  @Output() clickEvent = new EventEmitter();

  constructor(private element: ElementRef,
    private renderer: Renderer2) {
    this.element = element.nativeElement;
  }

  ngOnInit() {
   if (this.isShared) {
      this.renderer.addClass(this.element, 'action-icons-disabled');
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    if (this.isShared) {
      event.stopPropagation();
      event.preventDefault();
      event.stopImmediatePropagation();
    } else {
      // this.clickEvent.emit();
    }
  }
}