import { CatalogElement } from "./catalog.element";

export class SwissDrgElement extends CatalogElement {
    parent?: SwissDrgElement;
    children?: Array<SwissDrgElement>;
}