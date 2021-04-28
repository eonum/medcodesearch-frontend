import { CatalogElement } from '../../../model/catalog.element';
import { Component, OnInit, Input } from '@angular/core';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {group} from '@angular/animations';
import {b} from '@angular/core/src/render3';

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

  public t: string;
  constructor() { }

  public ngOnInit(): void {

  }

  /*
  public l (t: string): boolean {
    const regex = new RegExp('\\[n]\–')
    console.log(regex.test(t));
    return regex.test(t);
  }*/

}
