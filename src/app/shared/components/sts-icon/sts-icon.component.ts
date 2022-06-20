import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { IconName } from './icon-name';

@Component({
  selector: 'app-sts-icon',
  template: ``,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class STSIconComponent {
  @Input() set icon(value: IconName) {
    this.background = this.sanitizer.bypassSecurityTrustStyle(
      `url('assets/img/icon/${value}') center / cover no-repeat`
    );
  }

  @Input() set width(value: number) {
    this.widthInPixel = `${value}px`;
  }

  @Input() set height(value: number) {
    this.heightInPixel = `${value}px`;
  }

  @HostBinding('style.background')
  public background: SafeStyle;

  @HostBinding('style.width')
  public widthInPixel = '10px';

  @HostBinding('style.height')
  public heightInPixel = '10px';

  public constructor(private sanitizer: DomSanitizer) {}
}
