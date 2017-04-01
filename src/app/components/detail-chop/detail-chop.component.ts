import { Component, OnInit, Input } from '@angular/core';
import { CatalogElement } from "../../model/catalog.element";

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
