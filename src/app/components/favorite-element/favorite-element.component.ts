import { FavoriteElement } from '../../model/favorite.element';
import { ILoggerService } from '../../service/logging/i.logger.service';
import { IFavoriteElementService } from '../../service/favorites/i.favorite.element.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

/**
 * Displays elements which were marked by the user.
 * Allows opening and removing of marked elements.
 */
@Component({
  selector: 'app-favorite-element',
  templateUrl: './favorite-element.component.html',
  styleUrls: ['./favorite-element.component.css']
})
export class FavoriteElementComponent implements OnInit {

  /**
   * The elements which have been marked as favorites by the
   * user. Are retrieved from the {@link FavoriteElementService}
   */
  public favoriteElements: FavoriteElement[] = [];

  /**
   * The message which will be shown on the tooltip
   */
  public toolTipMessage: string;

  @ViewChild('tooltip') public tooltip;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    @Inject('ILoggerService') private logger: ILoggerService,
    @Inject('IFavoriteService') private favoriteService: IFavoriteElementService, ) { }

  public ngOnInit(): void {
    this.favoriteService.getFavoriteElements().subscribe((elements: FavoriteElement[]) => {
      const oldNumberOfElements = this.favoriteElements.length;
      this.favoriteElements = elements;
      if (oldNumberOfElements < elements.length) {
        this.showTooltip('LBL_ELEMENT_ADDED');
      }
    });
  }

  /**
   * Redirects to the details of the specified element.
   *
   * @param element the element to display
   */
  private openCode(element: FavoriteElement): void {
    this.logger.log('Route: ', this.route);
    this.router.navigate(
      [element.language, element.catalog, element.version, element.type, element.code],
      { queryParamsHandling: 'merge' })
      .catch(error => this.logger.error(error.message));
  }

  /**
   * Removes a specific element from the list of
   * marked elements.
   *
   * @param element the element to remove
   */
  private removeElement(element: FavoriteElement): void {
    this.favoriteService.remove(element);
    this.showTooltip('LBL_ELEMENT_REMOVED');
  }

  private showTooltip(labelKey: string): void {
    this.translate.get(labelKey).subscribe((res: string) => {
      this.toolTipMessage = res;
      this.tooltip.show();
      setTimeout(() => { this.tooltip.hide(); }, 2000);
    });
  }
}
