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

  /**
   * Timer which will hide tooltip on completion
   */
  private tooltipTimer: any;

  public url: string;

  @ViewChild('tooltip') public tooltip;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    @Inject('ILoggerService') private logger: ILoggerService,
    @Inject('IFavoriteService') private favoriteService: IFavoriteElementService, ) { }

  public ngOnInit(): void {
    this.favoriteService.getFavoriteElements()
      .subscribe((elements: FavoriteElement[]) => {
        this.updateFavorites(elements);
      });
  }

  private updateFavorites(favorites: FavoriteElement[]): void {
    const oldNumberOfElements = this.favoriteElements.length;
    this.favoriteElements = favorites;
    if (oldNumberOfElements < favorites.length) {
      this.showTooltip('LBL_ELEMENT_ADDED');
    }
  }

  /**
   * Redirects to the details of the specified element.
   *
   * @param element the element to display
   */
  private openCode(element: FavoriteElement): void {
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
  private removeElement(event: any, element: FavoriteElement): void {
    this.favoriteService.removeByFavoriteElement(element);
    this.setUrl();
    // Prevent dropdown from closing
    event.stopPropagation();
  }

  /**
   * Display the specified label text within a tooltip
   * below favorite button.
   *
   * @param labelKey the key of the label to display
   */
  private showTooltip(labelKey: string): void {
    this.translate.get(labelKey).subscribe((res: string) => {
      this.toolTipMessage = res;
      this.tooltip.show();
      this.tooltipTimer = setTimeout(() => {
        this.hideTooltip();
        this.tooltipTimer = null;
      }, 2000);
    });
  }

  /**
   * Hide the tooltip if shown
   */
  private hideTooltip(): void {
    if (this.tooltip.isOpen) {
      this.tooltip.hide();
    }
  }

  /**
   * This method is executed when the button which opens
   * the dropdown is clicked.
   * Hide the tooltip immediately and clear a running timer
   * which would hide the tooltip on completion.
   */
  public onDropdownShown(): void {
    this.hideTooltip();
    if (this.tooltipTimer) {
      clearTimeout(this.tooltipTimer);
      this.tooltipTimer = null;
    }
  }

  public openLink(): void {
    window.open(this.favoriteService.getUrl(), '_blank')
  }

  public setUrl() {
    this.url = this.favoriteService.getUrl();
  }
}
