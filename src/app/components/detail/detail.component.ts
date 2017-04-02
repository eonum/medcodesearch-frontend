import { Component, OnInit } from '@angular/core';
import { Catalog } from "../../catalog/catalog";
import { ActivatedRoute, Params } from "@angular/router";
import { CatalogElement } from "../../model/catalog.element";
import { Observable } from "rxjs/Observable";
import { SortHelper } from "../../helper/sort.helper";

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
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  /**
   * The active catalog, resolved from the activated route.
   * Serves as input for the search-form component.
   * */
  public catalog: Catalog;

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    Observable.zip(
      this.route.params,
      this.route.data,
      (params: Params, data: { catalog: Catalog }): any => {
        this.catalog = data.catalog;
        const type = params['type']
        const code = params['code'];
        return { type, code };
      }).subscribe(params => {
        this.updateView(params.type, params.code);
      });
  }

  /**
   * Load all data which shall be displayed
   * @param type the type of the element to display
   * @param code the code of the element to display
   */
  private updateView(type: string, code: string) {
    this.catalog.getByCode(type, code).then(element => {
      this.selectedElement = element;
      this.hierarchy = [];
      this.loadHierarchy(element);
      this.loadChildren(element);
    });
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
      });
    }
  }

  /**
   * Loads the immeadiate children of the currentElement
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
}
