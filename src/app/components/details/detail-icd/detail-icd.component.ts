import { CatalogElement } from '../../../model/catalog.element';
import { Component, Input, OnInit } from '@angular/core';

/**
   * Component to display custom details of an element
   * within the {@link IcdCatalog}.
   * Receives the `selectedElement` from the {@link DetailComponent}.
   */

@Component({
  selector: 'app-detail-icd',
  templateUrl: './detail-icd.component.html',
  styleUrls: ['./detail-icd.component.css']
})
export class DetailIcdComponent implements OnInit {

  @Input() public selectedElement: CatalogElement;

  constructor() { }

  public ngOnInit(): void {
  }

}
