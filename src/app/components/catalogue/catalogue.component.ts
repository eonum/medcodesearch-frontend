import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})


export class CatalogueComponent implements OnInit {

  public catalogues: string[] = ["drgs", "icds", "chops"]
  public selectedCalatogue: string;

  constructor(private router: Router,
              private route: ActivatedRoute,) { }

  /**
   * Subscribe to route parameters.
   */
  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
        let catalogue = params['catalogue'];

        if (this.catalogues.indexOf(catalogue) > -1) {
          this.selectedCalatogue = catalogue;
        } else {
          // Redirect to german
          this.router.navigate(['', 'drgs'], { relativeTo: this.route });
        }
      }
    );

  }

}
