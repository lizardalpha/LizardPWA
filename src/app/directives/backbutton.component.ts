import { Directive, HostListener, Input } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
    selector: '[backButton]'
})
export class BackButtonDirective {
    constructor(private location: Location) { }
    @Input('backButton') needsSaving: boolean;

    @HostListener('click')
    onClick() {
       
        //if (this.needsSaving) {
        //    var r = confirm("Are you sure you want to go back, any changs you have made will not be saved.");
        //    if (r == true) {
        //        this.location.back();
        //    } else {

        //    }
        //}
        //else {
        //    this.location.back();
        //}
      this.location.back();
        //before we do this, we need to check whether it needs saving
       
    }
}
