import { ILoggerService } from '../service/logging/i.logger.service';
import { Inject, NgZone, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileService } from '../service/mobile.service';

@Pipe({ name: 'convertCode' })
export class ConvertCodePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    public mobileService: MobileService,
    @Inject('ILoggerService') private logger: ILoggerService) {
    window['eonum'] = window['eonum'] || {};
    window['eonum'].searchCode = this.searchCode.bind(this);
  }

  public transform(s: string): SafeHtml {

    const regex = new RegExp(/[\{\(](([A-Z\d]{1,3}\.?){1,3})(-(([A-Z\d]{1,3}\.?){1,3})?)?[\}\)]/g);
    s = s.replace(regex, this.wrapCode);
    return this.sanitizer.bypassSecurityTrustHtml(s);

    /*
     ORIGINALE
     ---------
     var item = data[field][j].replace(/[\{|\(](\w{2,3}\.\w{1,2}(\.\w{1,2})?)-?[\}|\)]/, '<a href="/search?query=$1">$1</a>');
     item = item.replace(/\{(\w{2,3})(\.-)?\}/, '<a href="/search?query=$1">$1</a>');
     item = item.replace(/\{(\w{2,3})-(\w{2,3})\}/, '<a href="/search?query=$1">$1</a>-<a href="/search?query=$2">$2</a>');
     item = item.replace(/\((\d\d\.\d\d)-(\d\d\.\d\d)\)/, '<a href="/search?query=$1#">$1</a>-<a href="/search?query=$2">$2</a>');
     */
  }

  private wrapCode(match: any, c1: any, c2: any, c3: any, c4: any, c5: any): string {
    c1 = c1.replace(/\.$/, '');
    let link = '(<span class="link" onclick="window.eonum.searchCode(\'' + c1 + '\')">' + c1 + '</span>';
    if (c4 && c4.length > 2) {
      c4 = c4.replace(/\.$/, '');
      link += '-' + '<span class="link" onclick="window.eonum.searchCode(\'' + c4 + '\')">' + c4 + '</span>';
    }
    link += ')';
    return link;
  }


  public searchCode(query: string): void {
    this.ngZone.run(() => this.searchCodeRun(query));
  }

  private searchCodeRun(query: string): void {
    let currentRoute = this.route.root;
    while (currentRoute.children[0] !== undefined) {
      currentRoute = currentRoute.children[0];
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 'query': query }
    }).catch(error => this.logger.log(error));

    this.mobileService.focus('results');

  }
}

