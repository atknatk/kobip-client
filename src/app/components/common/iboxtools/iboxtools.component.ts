import { Component, Input } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'iboxtools',
  templateUrl: 'iboxtools.template.html'
})
export class IboxtoolsComponent {
  @Input() collapse;

  public close(e): void {
    e.preventDefault();
    const content = jQuery(e.target).closest('div.ibox');
    content.remove();
  }

  public collapseTab(e): void {
    e.preventDefault();
    const ibox = jQuery(e.target).closest('div.ibox');
    const button = jQuery(e.target).closest('i');
    const content = ibox.children('.ibox-content');
    content.slideToggle(200);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(function () {
      ibox.resize();
      ibox.find('[id^=map-]').resize();
    }, 50);

  }


}
