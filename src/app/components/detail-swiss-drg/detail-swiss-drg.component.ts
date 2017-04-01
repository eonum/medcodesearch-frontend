import { Component, OnInit, Input } from '@angular/core';
import { CatalogElement } from "../../model/catalog.element";

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
