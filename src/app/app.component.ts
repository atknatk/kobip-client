import { Component } from '@angular/core';

@Component({
  selector: 'kobip-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public options = {
    position: ['top', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    maxStack: 5
  };
  public confirmationsOptions = {};

 /* constructor(private localize: LocalizeRouterService) {
    console.log('ROUTES', this.localize.parser.routes);
    this.localize.changeLanguage('tr');
  }
*/

  /*  @HostListener('window:unload', [ '$event' ])
    unloadHandler(event) {
      alert('window:unload');
    }

    @HostListener('window:beforeunload', [ '$event' ])
    beforeUnloadHander(event) {
      alert('window:beforeunload');
    }*/
}
