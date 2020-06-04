
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppGlblSettingsService } from './shared/services/app-glbl-settings.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    apptitle = 'LitApp';

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches), shareReplay());

    constructor(private breakpointObserver: BreakpointObserver, protected appGlblSettings: AppGlblSettingsService) {
    //appGlblSettings.appearance = 'fill';
    }

    get userName(): string {
        return this.appGlblSettings.userName;
    }  
}

