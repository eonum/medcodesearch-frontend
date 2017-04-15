import { RememberedElement } from '../../model/remembered.element';
import { ILoggerService } from '../../service/logging/i.logger.service';
import { RememberElementService } from '../../service/remember.element.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  public rememberedElements: RememberedElement[];

  constructor(private rememberService: RememberElementService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject('ILoggerService') private logger: ILoggerService) { }

  public ngOnInit(): void {
    this.rememberService.subscribe(() => {
      this.loadRememberedElements();
    });
    this.loadRememberedElements();
  }

  private loadRememberedElements(): void {
    this.rememberedElements = this.rememberService.getRememberedElements();
  }

  /**
   * Redirects to the details of the specified element.
   * 
   * @param element the element to display
   */
  private openCode(element: RememberedElement): void {
    this.router.navigate(
      [element.language, element.catalog, element.version, element.type, element.code],
      { queryParamsHandling: 'merge' })
      .catch(error => this.logger.log(error.message));
  }

  /**
   * Removes a specific element from the list of
   * marked elements.
   * 
   * @param element the element to remove
   */
  private removeElement(element: RememberedElement): void {
    this.rememberService.remove(element);
  }
}
