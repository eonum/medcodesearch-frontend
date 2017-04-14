import { Component, Input, OnChanges, OnInit, SimpleChange, Inject } from '@angular/core';
import {Catalog} from '../../../catalog/catalog';
import {CatalogElement} from '../../../model/catalog.element';
import {ActivatedRoute, Router} from '@angular/router';
import {SortHelper} from '../../../helper/sort.helper';


import 'rxjs/add/observable/merge';

import { environment } from '../../../../environments/environment';
import { ILoggerService } from "../../../service/i.logger.service";

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

export class DetailComponent implements OnInit, OnChanges {

  /**
   * The active catalog, resolved from the activated route.
   * Serves as input for the search-form component.
   * */
  @Input()
  public catalog: Catalog;

  /**
   * The current element for which the details are displayed
   */
  @Input()
  public selectedElement: CatalogElement;

  /**
   * All elements from the root of the catalog to the `selectedElement`
   */
  public hierarchy: CatalogElement[] = [];

  /**
   * All children of the `selectedElement`
   */
  public children: CatalogElement[] = [];

  constructor(private route: ActivatedRoute, 
              private router: Router,
              @Inject('ILoggerService') private logger: ILoggerService) {
  }

  ngOnInit() {
    this.logger.log('>> DetailComponent on init.');
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.updateView();
  }

  /**
   * Load all data which shall be displayed
   * @param type the type of the element to display
   * @param code the code of the element to display
   */
  private updateView() {
      if (this.selectedElement === undefined ||
      this.selectedElement === null){
        return;
      }

      this.hierarchy = [];
      this.loadHierarchy(this.selectedElement);
      this.loadChildren(this.selectedElement);
  }

  /**
   * Loads all elements from the currentElement up to the catalog root.
   * @param currentElement the leaf element of which the hierarchy will be loaded
   */
  private loadHierarchy(currentElement: CatalogElement) {
    this.hierarchy.unshift(currentElement);
    const parent = currentElement.parent;
    if (parent !== undefined && parent !== null) {
      const code: string = this.extractCodeFromUrl(parent.url);
      const type: string = this.extractTypeFromUrl(parent.url);
      this.catalog.getByCode(type, code).then(element => {
        element.url = parent.url;
        this.loadHierarchy(element);
      }).catch(error => this.logger.log(error));
    }
  }

  /**
   * Loads the immediate children of the currentElement
   * @param currentElement the element of which the children will be loaded
   */
  private loadChildren(currentElement: CatalogElement) {
    const children = currentElement.children;
    if (children !== undefined && children !== null && children.length > 0) {
      children.forEach(child => {
        child.type = this.extractTypeFromUrl(child.url);
      });

      this.children = children.sort((a: CatalogElement, b: CatalogElement) => {
        if (SortHelper.isNumberWithLeadingLetter(a.code)) {
          return SortHelper.compareAsNumberWithLeadingLetter(a.code, b.code);
        }
        if (SortHelper.isRomanNumber(a.code)) {
          return SortHelper.compareAsRomanNumber(a.code, b.code);
        }
        else {
          return SortHelper.compareAsLiteral(a.code, b.code);
        }
      });
    }
    else {
      this.children = [];
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
      ['', languageRouteParam, catalogRouteParam, versionRouteParam, element.type, this.extractCodeFromUrl(element.url)], {
        queryParamsHandling: 'merge'
      }).catch(error => this.logger.log(error.message));
  }

  /**
   * Navigates back to the original search.
   */
  public toSearch(): void {
    this.router.navigate(
      [this.catalog.getDomain(), this.catalog.getActiveVersion()], {
        relativeTo: this.route.parent.parent,
        queryParamsHandling: 'merge'
      }
    ).catch(error => this.logger.log(error));
  }
}
