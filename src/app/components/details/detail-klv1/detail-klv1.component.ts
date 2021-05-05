import { CatalogElement } from '../../../model/catalog.element';
import { Component, OnInit, Input } from '@angular/core';
import {last, map, publish} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {group} from '@angular/animations';
import {b} from '@angular/core/src/render3';
import {el} from '@angular/platform-browser/testing/src/browser_util';

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
}
