import { CatalogElement } from './catalog.element';

/**
 * Model class for favorite elements. Holds all necessary
 * information to navigate back to the original catalog element.
 * 
 * Instances of this class may be stored into a persistent store
 * by a {@link IFavoritePersister}.
 */
export class FavoriteElement {

  public language: string;
  public catalog: string;
  public version: string;
  public type: string;
  public name: string;
  public code: string;
  public text: string;

  /**
   * Create a favorite element from a specified catalog element.
   * 
   * @param element the element to create a favorite from
   * @param version the version of the catalog of the element
   * @param catalog the catalog of the element
   * @param language the language of the element
   */
  public static from(element: CatalogElement, version: string, catalog: string, language: string): FavoriteElement {
    const to = new FavoriteElement();
    to.language = language;
    to.catalog = catalog;
    to.version = version;
    to.type = element.type;
    to.name = element.name;
    to.code = element.code;
    to.text = element.text;

    return to;
  }

  /**
   * Get the unique key for a specific catalog element.
   * The key is used to store/retrieve a favorite element.
   * 
   * @param element the element to generate the key for
   * @param version the version of the catalog of the element
   * @param catalog the catalog of the element
   * @param language the language of the element
   */
  public static keyForCatalogElement(element: CatalogElement, version: string, catalog: string, language: string): string {
    return FavoriteElement.keyFor(element.code, element.type, version, catalog, language);
  }

  /**
   * Get the unique key for a specific favorite element.
   * The key is used to store/retrieve the favorite element.
   * 
   * @param element the element to generate the key for
   * @param version the version of the catalog of the element
   * @param catalog the catalog of the element
   * @param language the language of the element
   */
  public static keyForFavoriteElement(element: FavoriteElement): string {
    return FavoriteElement.keyFor(element.code, element.type, element.version, element.catalog, element.language);
  }

  private static keyFor(code: string, type: string, version: string, catalog: string, language: string): string {
    return `${language}_${catalog}_${version}_${type}_${code}`;
  }
}
