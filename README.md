# medcodesearch-frontend

Frontend for the medcodesearch search service: A joint project with the University of Berne (PSE 2017)

--------------------------------------------

V0.3 is hosted as GithubProject Page for this repo.

[eonum.github.io/medcodelogic-frontend](https://eonum.github.io/medcodelogic-frontend)

----------------------------------------------
## Documentation

The documentation of this project resides in the directory `/documentation`. See the file
`/documentation/CodeStructure.md` for an overview of the project structure.

## Setup
This project was generated with the [Angular CLI](https://angular.io/docs/ts/latest/cli-quickstart.html).

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Adding new catalogues

After adding new catalogues to the medcodesearch-backend, add new versions in `/src/assets/versions.json`. Check changes before commiting and pushing them. Run `ng build --prod` in order to deploy changes and check on [medcodesearch](http://medcodesearch.ch) if successfull (maybe you have to clear browser cache).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
