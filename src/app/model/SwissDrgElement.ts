import { CatalogElement } from './CatalogElement'

export class SwissDrgElement extends CatalogElement {
    parent?: SwissDrgElement;
    children?: Array<SwissDrgElement>;
}