# Coding Standards

## Project Structure

- **documentation**: Contains documentation files for the application.
- **e2e**: Contains all files concerning end-to-end tests (not yet used).
- **src**
	- **app**: Contains the sourcecode of the application and some configuration files.
		- **catalog**: Contains all catalog related classes (catalog interfaces and their implementations).
		- **components**: Contains all angular components used in the application. Each component resides in its own subfolder containing all files related to this component (`.ts`, `.css`, `.html`, `.spec.ts`).
		- **model**: Contains all classes which are used to model the elements of a catalog and are returned from the eonum API.
		- **service**: Contains all service interfaces and implementations, which access the eonum API.
	- **assets**: Contains all icons, images and other static resources.
	- **styles**: Contains all global stylesheets.

## General Guidelines

- Each class is defined in *its own file*.
- All file-, class-, method- and directory names are in **english**, as well as all comments.
- File names consist of only lower-case letters with individual parts separated by a dot (e.g. `catalog.component.css` or `language.component.spec.ts`).

## Typescript/JavaScript
- **Class names** are in `UpperCamelCase`.
- **Method names** are in `lowerCamelCase`.
- **Variables** and **method parameters** are in `lowerCamelCase`.

## CSS

- **CSS-classes** follow the `.lower-dash-syntax` like the bootstrap-css-classes.

## Documentation

- [**JSDoc**](http://usejsdoc.org) syntax is used in the whole project to document the TypeScript classes
- **Every class** has a class comment describing the responsibility of the class.
- **Every public method** has a comment describing *what the method does*, *what it returns* and *what the parameters mean*.
- Inline comments to describe what the code is doing are encouraged wherever appropriate.
- The comments are in english.

## Component Classes

- All components reside within their own subdirectory within the directory `/src/app/components`.
- The name of a component class is alway suffixed with 'Component'. Example: `search.component`, `app.component`.
- Four files belong to each component:
	- `example.component.ts`: Contains the source code of the component.
	- `example.component.css`: Contains component specific styling.
	- `example.component.html`: Contains the html template of the component.
	- `example.component.spec.ts`: Contains unit test for the component.
- Components can be created by running the command `ng g component NameOfComponent` from within the `components` directory.

## Service Classes

- All services reside within the directory `/src/app/service`.
- Their name is suffixed with 'Service'. Example: `SwissDrgService`.
- All services are decorated with the `@Inject()` directive to allow them being injected into other classes.
- Their filename matches their classname but adhere to the name scheme for files.

## Catalog Classes

- All catalogs reside within the directory `/src/app/catalog`.
- Their name is suffixed with 'Catalog'. Example: `SwissDrgCatalog`.
- All catalogs are decorated with the `@Inject()` directive to allow them being injected into components.
- Their filename matches their classname but adhere to the name scheme for files.
- Each public method of a catalog is tested using Karma unit tests.
- Tests go into a `catalog.name.spec.ts` file in the same directory

## Model Classes

- All model classes reside within the directory `/src/app/model`.
- Their name is not suffixed.
- Their filename matches their classname but adhere to the name scheme for files.
- They should not contain any business logic.