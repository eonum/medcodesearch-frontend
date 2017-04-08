import { NgZone, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Pipe({ name: 'convertCode' })
export class ConvertCodePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer, private ngZone: NgZone, private route: ActivatedRoute, private router: Router) {
    window['eonum'] = window['eonum'] || {};
    window['eonum'].searchCode = this.searchCode.bind(this);
  }

  public transform(s: string): SafeHtml {
    const regex = new RegExp(/[\{\(](([\w\d]{1,3}\.?){1,3})(-(([\w\d]{1,3}\.?){1,3})?)?[\}\)]/g);
    s = s.replace(regex, this.wrapCode);
    return this.sanitizer.bypassSecurityTrustHtml(s);

    /*
     PROBLEME
     --------
     Die Kategorien Z40-Z54 dienen
     Einzelne Episoden von reaktiver Depression (F32.0, F32.1, F32.2)
     */
  }

  private wrapCode(match, c1, c2, c3, c4, c5) {
    c1 = c1.replace(/\.$/, '');
    let link = '(<span class="link" onclick="window.eonum.searchCode(\'' + c1 + '\')">' + c1 + '</span>';
    if (c4 && c4.length > 2) {
      c4 = c4.replace(/\.$/, '');
      link += '-' + '<span class="link" onclick="window.eonum.searchCode(\'' + c4 + '\')">' + c4 + '</span>';
    }
    link += ')';
    return link;
  }

  public searchCode(query) {
    this.ngZone.run(() => this.searchCodeRun(query));
  }

  private searchCodeRun(query) {
    let currentRoute = this.route.root;
    while (currentRoute.children[0] !== undefined) {
      currentRoute = currentRoute.children[0];
    }
    const catalog = currentRoute.snapshot.data.catalog;

    this.router.navigate(['.'], {
      relativeTo: this.route.parent,
      queryParams: { query: query }
    }).catch(error => console.log(error));
  }
}

