import { Component, OnInit, Input } from '@angular/core';
import { CatalogElement } from "../../model/catalog.element";

@Component({
  selector: 'app-detail-icd',
  templateUrl: './detail-icd.component.html',
  styleUrls: ['./detail-icd.component.css']
})
export class DetailIcdComponent implements OnInit {

  @Input() public selectedElement: CatalogElement;

  constructor() { }

  ngOnInit() {
  }

}
