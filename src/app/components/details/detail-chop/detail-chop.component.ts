import { Component, Input, OnInit } from '@angular/core';
import { CatalogElement } from '../../../model/catalog.element';

/**
 * Component to display custom details of an element
 * within the {@link ChopCatalog}.
 * Receives the `selectedElement` from the {@link DetailComponent}.
 */

@Component({
  selector: 'app-detail-chop',
  templateUrl: './detail-chop.component.html',
  styleUrls: ['./detail-chop.component.css']
})
export class DetailChopComponent implements OnInit {

  @Input() public selectedElement: CatalogElement;

  constructor() { }

  ngOnInit() {
  }

}
