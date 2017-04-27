import { RememberedElement } from '../../model/remembered.element';
import { ILoggerService } from '../../service/logging/i.logger.service';
import { RememberElementService } from '../../service/remember.element.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

/**
 * Displays elements which were marked by the user.
 * Allows opening and removing of marked elements.
 */
@Component({
  selector: 'app-remember-element',
  templateUrl: './remember-element.component.html',
  styleUrls: ['./remember-element.component.css']
})
export class RememberElementComponent implements OnInit {

  /**
   * The elements which have been marked as favorites by the
   * user. Are retrieved from the {@link RememberElementService}
   */
  public rememberedElements: RememberedElement[] = [];

  /**
   * The message which will be shown on the tooltip
   */
  public toolTipMessage: string;

  @ViewChild('tooltip') public tooltip;

  constructor(private rememberService: RememberElementService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    @Inject('ILoggerService') private logger: ILoggerService) { }

  public ngOnInit(): void {
    this.rememberService.getRememberedElements().subscribe((elements: RememberedElement[]) => {
      const oldNumberOfElements = this.rememberedElements.length;
      this.rememberedElements = elements;
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
  private openCode(element: RememberedElement): void {
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
  private removeElement(element: RememberedElement): void {
    this.rememberService.remove(element);
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
