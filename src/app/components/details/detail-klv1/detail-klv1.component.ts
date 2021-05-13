import { CatalogElement } from '../../../model/catalog.element';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Component to display custom details of an element
 * within the {@link Klv1Catalog}.
 * Receives the `selectedElement` from the {@link DetailComponent}.
 */

@Component({
  selector: 'app-detail-klv1',
  templateUrl: './detail-klv1.component.html',
  styleUrls: ['./detail-klv1.component.css']
})
export class DetailKlv1Component implements OnInit {

  @Input() public selectedElement: CatalogElement;

  constructor() {
  }

  public ngOnInit(): void {
  }

  /**
   * Checks if the obligation is true or false and returns the appropriate boolean value.
   * */
  public testColor(str: string): boolean {
    const reg = /^Ja$|^Oui$|^Sì$/;
    return reg.test(str);
  }
}
