import { Component, OnInit } from '@angular/core';
import { Catalog } from "../../catalog/catalog";
import { ActivatedRoute, Params } from "@angular/router";
import { CatalogElement } from "../../model/catalog.element";
import { Observable } from "rxjs/Observable";

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

  public selectedElement: CatalogElement;

  public hierarchy: CatalogElement[] = [];
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

  private updateView(type: string, code: string) {
    this.catalog.getByCode(type, code).then(element => {
      this.selectedElement = element;
      this.hierarchy = [];
      this.loadHierarchy(element);
      this.loadChildren(element);
    });
  }

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

  private loadChildren(currentElement: CatalogElement) {
    const children = currentElement.children;
    if (children !== undefined && children !== null && children.length > 0) {
      children.forEach(child => {
        child.type = this.extractTypeFromUrl(child.url);
      });

      this.children = children.sort((a: CatalogElement, b: CatalogElement) => {
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
      });
    }
    else {
      this.children = [];
    }
  }

  private extractTypeFromUrl(url: string): string {
    const regex: RegExp = new RegExp('^\/[a-z]{2}\/([a-z_]+)\/.*$');
    const match = regex.exec(url);
    return match[1];
  }

  private extractCodeFromUrl(url: string): string {
    if (url !== undefined) {
      const lastSlash = url.lastIndexOf('/');
      return url.substr(lastSlash + 1);
    }
    return '';
  }
}
