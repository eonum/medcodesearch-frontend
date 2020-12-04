import { CatalogElement } from '../../../model/catalog.element';
import { Component, Input, OnInit } from '@angular/core';

/**
 * Component to display custom details of an element
 * within the {@link SwissDrgCatalog}.
 * Receives the `selectedElement` from the {@link DetailComponent}.
 */
@Component({
  selector: 'app-detail-tarmed',
  templateUrl: './detail-tarmed.component.html',
  styleUrls: ['./detail-tarmed.component.css']
})
export class DetailTarmedComponent implements OnInit {

  @Input() public selectedElement: CatalogElement;

  constructor() { }

  public ngOnInit(): void {
  }

}
