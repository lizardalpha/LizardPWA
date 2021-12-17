import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable()
export class LoaderService {
    // A BehaviourSubject is an Observable with a default value
    public isLoading = new BehaviorSubject<boolean>(false);

    constructor() { }
}
