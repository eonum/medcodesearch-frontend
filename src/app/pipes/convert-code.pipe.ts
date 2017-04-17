import { NgZone, Pipe, PipeTransform, Inject } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import { Catalog } from '../catalog/catalog';
import { ILoggerService } from "../service/i.logger.service";

@Pipe({ name: 'convertCode' })
export class ConvertCodePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer,
              private ngZone: NgZone, 
              private route: ActivatedRoute, 
              private router: Router,
              @Inject('ILoggerService') private logger: ILoggerService) {
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
    const catalog: Catalog = currentRoute.snapshot.data.catalog;
    const version: string = currentRoute.snapshot.params['version'];
    const language: string = currentRoute.snapshot.params['language'];

    this.router.navigate([language, catalog.getDomain(), version], {
      queryParams: { 'query': query }
    }).catch(error => this.logger.log(error));
  }
}

