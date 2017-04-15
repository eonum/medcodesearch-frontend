import { CatalogElement } from '../../../model/catalog.element';
import { Component, Input, OnInit } from '@angular/core';

/**
 * Component to display custom details of an element
 * within the {@link SwissDrgCatalog}.
 * Receives the `selectedElement` from the {@link DetailComponent}.
 */
@Component({
  selector: 'app-detail-swiss-drg',
  templateUrl: './detail-swiss-drg.component.html',
  styleUrls: ['./detail-swiss-drg.component.css']
})
export class DetailSwissDrgComponent implements OnInit {

  @Input() public selectedElement: CatalogElement;

  constructor() { }

  ngOnInit() {
  }

}
