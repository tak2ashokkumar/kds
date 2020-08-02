import { Directive, Input, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
    selector: '[truncateText]'
})
export class TruncateTextDirective implements OnInit {
    @Input('truncateText') columnPercent: number;
    constructor(private eleRef: ElementRef,
        private renderer: Renderer2) {
    }

    ngOnInit() {
    }

    changeWidth() {
        const cardBodyWidth = this.eleRef.nativeElement.parentNode.parentNode.parentNode.parentNode.clientWidth - 32;

        this.renderer.setStyle(this.eleRef.nativeElement.parentNode.parentNode.parentNode, 'width', cardBodyWidth + 'px');
        this.renderer.setStyle(this.eleRef.nativeElement.parentNode.parentNode, 'width', cardBodyWidth + 'px');
        this.renderer.setStyle(this.eleRef.nativeElement.parentNode, 'width', cardBodyWidth + 'px');

        const rowWidthWithOutActions = cardBodyWidth - 170;
        const tdNeededWidth = rowWidthWithOutActions * (this.columnPercent / 100);
        this.renderer.setStyle(this.eleRef.nativeElement, 'width', tdNeededWidth + 'px');
        this.renderer.setStyle(this.eleRef.nativeElement.childNodes[0], 'width', tdNeededWidth + 'px');

        this.renderer.addClass(this.eleRef.nativeElement.childNodes[0], 'text-truncate');

        if (this.eleRef.nativeElement.childNodes[0].scrollWidth > this.eleRef.nativeElement.childNodes[0].clientWidth) {
            this.renderer.removeClass(this.eleRef.nativeElement, 'custom-tooltip-hide');
        } else {
            this.renderer.addClass(this.eleRef.nativeElement, 'custom-tooltip-hide');
        }
    }

    ngAfterViewInit() {
        this.changeWidth();
    }

    @HostListener('window:resize')
    resized() {
        this.changeWidth();
    }

}


@Directive({
    selector: '[setTableColumnWidth]'
})
export class SetColumnWidthDirective implements OnInit {
    isActionIconsExists: boolean = false;
    isStatusExists: boolean = false;

    constructor(private eleRef: ElementRef,
        private renderer: Renderer2) {
    }

    ngOnInit() { }

    setActionIconsColumnWidth(td: any, actionIconsColumnWidth: number) {
        this.renderer.setStyle(td, 'width', actionIconsColumnWidth + 'px');
        this.renderer.addClass(td, 'text-truncate');
    }

    setOtherColumnsWidth(tableWidth: number, numberOfColumns: number, actionIconsColumnWidth: number, td: any) {
        let WidthWithoutStatusAndActionIcons = tableWidth;
        let counter = 0;

        if (this.isActionIconsExists) {
            counter = counter + 1;
            WidthWithoutStatusAndActionIcons = WidthWithoutStatusAndActionIcons - actionIconsColumnWidth;
            // WidthWithoutStatusAndActionIcons = WidthWithoutStatusAndActionIcons - actionIconsColumnWidth - 100;
        }

        // WidthWithoutStatusAndActionIcons = (tableWidth - WidthWithoutStatusAndActionIcons < 100 ? tableWidth - 100 : WidthWithoutStatusAndActionIcons)
        this.renderer.setStyle(td, 'width', WidthWithoutStatusAndActionIcons / (numberOfColumns - counter) + 'px');
        this.renderer.addClass(td, 'text-truncate');
        const isStatusExists = td.className.includes('status-column');
        if (td.children.length && !isStatusExists) {
            this.renderer.setStyle(td.children[0], 'width', (WidthWithoutStatusAndActionIcons / (numberOfColumns - counter)) - 16 + 'px');
            this.renderer.addClass(td.children[0], 'text-truncate');

            if (td.childNodes[0].scrollWidth > td.childNodes[0].clientWidth) {
                this.renderer.removeClass(td, 'custom-tooltip-hide');
            } else {
                this.renderer.addClass(td, 'custom-tooltip-hide');
            }
        }
    }

    setColumnWidth(tableWidth: number) {
        const numberOfColumns = this.eleRef.nativeElement.children.length;
        this.isActionIconsExists = this.eleRef.nativeElement.children[numberOfColumns - 1].className.includes('action-icons-column');

        let actionIconsColumnWidth = 0;
        if (this.isActionIconsExists) {
            actionIconsColumnWidth = this.eleRef.nativeElement.children[numberOfColumns - 1].children.length * 50;
        }

        for (let td of this.eleRef.nativeElement.children) {
            // console.log('td : ', td.children[0].nodeName);
            if (td.className.includes('action-icons-column')) {
                this.setActionIconsColumnWidth(td, actionIconsColumnWidth);
            } else {
                this.setOtherColumnsWidth(tableWidth, numberOfColumns, actionIconsColumnWidth, td);
            }
        }
    }

    setTableWidth() {
        // console.log('ele : ', this.eleRef);
        let cardBodyWidth = 0;
        if (this.eleRef.nativeElement.parentNode.parentNode.parentNode.className.includes('card-body')) {
            cardBodyWidth = this.eleRef.nativeElement.parentNode.parentNode.parentNode.clientWidth;
        } else {
            cardBodyWidth = this.eleRef.nativeElement.parentNode.parentNode.parentNode.parentNode.clientWidth;
        }
        const tableWidth = cardBodyWidth - 32;
        this.renderer.setStyle(this.eleRef.nativeElement, 'width', tableWidth);

        this.setColumnWidth(tableWidth)
    }

    ngAfterViewInit() {
        this.setTableWidth();
    }

    @HostListener('window:resize')
    resized() {
        this.setTableWidth();
    }

}