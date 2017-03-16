import {Component, OnInit} from "@angular/core";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'language-list',
    //template: `<router-outlet></router-outlet>`,
    templateUrl: './language.component.html',
})

/**
 * This component applies the translation for every url that begins with a Language tag.
 */
export class LanguageComponent implements OnInit {

    languages = ['de', 'fr', 'it', 'en'];

    /**
     * @param {Router} router - to change language
     * @param {ActivateRoute} route - to observe lang param from route
     * @param {TranslateService} translate - to set translation
     */
    constructor(private router: Router,
                private route: ActivatedRoute,
                private translate: TranslateService) {

        translate.setDefaultLang('de');
    }

    /**
     * Subscribe to route parameter :language/ and apply translation on change.
     */
    ngOnInit() {

        this.route.params.subscribe((params: Params) => {
                let lang = params['language'];

                if (this.languages.indexOf(lang) > -1) {
                    this.translate.use(lang)
                } else {
                    // Redirect to index
                    this.router.navigate(['']);
                }
            }
        );
    }
}
