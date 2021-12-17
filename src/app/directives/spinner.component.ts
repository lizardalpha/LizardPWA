import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from './loader.service';
declare var jQuery: any;
@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

   

    constructor(public loaderService: LoaderService) { }

    ngOnInit() {
        
    }
}
