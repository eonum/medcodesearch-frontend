import { CatalogElement } from '../../../model/catalog.element';
import { ILoggerService } from '../../../service/logging/i.logger.service';
import { Component, Inject, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { MobileService } from '../../../service/mobile.service';
import { IFavoriteElementService } from '../../../service/favorites/i.favorite.element.service';
import {unwrapFirst} from 'codelyzer/util/function';
import {selectValueAccessor} from '@angular/forms/src/directives/shared';

/**
 * Component for displaying of detail information of a specific
 * CatalogElement.
 * Displays also the hierarchy of the current catalog to a specific
 * element and the children of a specific element.
 *
 * The element to display is resolved from routing params by the
 * {@link CatalogElementResolver}.
 */
@Component({
  selector: 'app-detail-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  /**
   * The active catalog, resolved from the activated route.
   */
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

  @ViewChild('buttonFavorite') public buttonFavorite;

  constructor(private route: ActivatedRoute,
    private router: Router,
    @Inject('IFavoriteService') private favoriteService: IFavoriteElementService,
    @Inject('ILoggerService') private logger: ILoggerService,
    public mobileService: MobileService) {
  }

  public ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.selectedElement = data.catalogElement;

      // check if children of klv1_chapters are valid and filter valid children
     if (this.selectedElement.children !== null && this.selectedElement.children !== undefined && this.selectedElement.children.length !== 0 && this.selectedElement.type === 'klv1_chapters') {
          this.selectedElement.children = this.selectedElement.children.filter(val => {return val.text !== null});
     }
     this.updateView();
    });
  }

  /**
   * Reload the hierarchy and the children for
   * the selectedElement.
   */
  public updateView(): void {
    this.catalog = this.route.parent.snapshot.params['catalog'];
    this.setHierarchy();
    this.children = this.selectedElement.children;
  }

  /**
   * Add the specified element to the list of favorites
   * or remove it from the list.
   *
   * @param element the element to add or remove
   */
  public toggleFavorite(element: CatalogElement): void {

    const language: string = this.route.parent.snapshot.params['language'];
    const catalog: string = this.route.parent.snapshot.params['catalog'];
    const version: string = this.route.parent.snapshot.params['version'];

    if (!this.favoriteService.isFavorite(element, version, catalog, language)) {
      this.favoriteService.add(element, version, catalog, language);
    } else {
      this.favoriteService.removeByCatalogElement(element, version, catalog, language);
    }
    this.buttonFavorite.nativeElement.blur();
  }

  /**
   * Check whether the specified element has been marked
   * as favorite.
   *
   * @param element the element to check
   */
  public isFavorite(element: CatalogElement): boolean {
    const language: string = this.route.parent.snapshot.params['language'];
    const catalog: string = this.route.parent.snapshot.params['catalog'];
    const version: string = this.route.parent.snapshot.params['version'];
    return this.favoriteService.isFavorite(element, version, catalog, language);
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
   * @param element the element to navigate to
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
