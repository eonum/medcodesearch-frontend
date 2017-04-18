import {CatalogElement} from '../../../model/catalog.element';
import {ILoggerService} from '../../../service/logging/i.logger.service';
import {RememberElementService} from '../../../service/remember.element.service';
import {Component, Inject, Input, OnChanges, SimpleChange} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * Container for a {@link SearchFormComponent} and the details (including the hierarchy)
 * of a {@link CatalogElement}.
 * The component is assigned to the route `<catalog>/<version>/<type>/<code>`.
 *
 * A catalog is resolved by the {@link CatalogResolver} and then passed as input
 * to this component. Each time the `type` or `code` in the
 * Routers params or data changes, the `selectedElement` is updated.
 */

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent {

  /**
   * The active catalog, resolved from the activated route.
   * Serves as input for the search-form component.
   * */

  public catalog: string;

  /**
   * The current element for which the details are displayed
   */

  public selectedElement: CatalogElement;

  /**
   * All elements from the root of the catalog to the `selectedElement`
   */
  public hierarchy: CatalogElement[] = [];

  /**
   * All children of the `selectedElement`
   */
  public children: CatalogElement[] = [];

  public count = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rememberService: RememberElementService,
              @Inject('ILoggerService') private logger: ILoggerService) {
    this.logger.log('[DetailComponent] constructor');
    this.route.data.subscribe(
      data => {
        this.selectedElement = data.catalogElement;
        this.logger.log('[DetailComponent]', this.selectedElement);
        this.updateView()
      }
    );
  }


  public updateView(): void {
    this.logger.log(`[DetailComponent] on Changes: ${this.selectedElement.code}.`);
    this.catalog = this.route.snapshot.params['catalog'];
    this.setHierarchy();
    this.children = this.selectedElement.children;
  }

  public rememberCode(element: CatalogElement): void {
    const language: string = this.route.parent.snapshot.params['language'];
    const catalog: string = this.route.parent.snapshot.params['catalog'];
    const version: string = this.route.parent.snapshot.params['version'];
    this.rememberService.add(element, version, catalog, language);
    console.log(this.rememberService)
  }

  /**
   * Set the hierarchy for the selected element.
   */
  private setHierarchy(): void {
    this.hierarchy = [];
    let tmp = this.selectedElement;
    while (tmp) {
      this.hierarchy.unshift(tmp);
      tmp = tmp.parent;
    }
  }

  /**
   * Extracts the type from the url of a {@link CatalogElement}
   * @param url the url of a {@link CatalogElement}
   */
  private extractTypeFromUrl(url: string): string {
    const regex: RegExp = new RegExp('^\/[a-z]{2}\/([a-z_]+)\/.*$');
    const match = regex.exec(url);
    return match[1];
  }

  /**
   * Extracts the code from the url of a {@link CatalogElement}
   * @param url the url of a {@link CatalogElement}
   */
  private extractCodeFromUrl(url: string): string {
    if (url !== undefined) {
      const lastSlash = url.lastIndexOf('/');
      return url.substr(lastSlash + 1);
    }
    return '';
  }

  /**
   * Navigates to a particular code.
   *
   * @param elm
   */
  public openCode(element: CatalogElement): void {
    const languageRouteParam = this.route.snapshot.params['language'];
    const catalogRouteParam = this.route.snapshot.params['catalog'];
    const versionRouteParam = this.route.snapshot.params['version'];

    this.router.navigate(
      [element.type, this.extractCodeFromUrl(element.url) || element.code], {
        queryParamsHandling: 'merge',
        relativeTo: this.route.parent
      }).catch(error => this.logger.error(error.message));
  }

}
