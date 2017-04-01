/**
 * Contains configuration parameters for a {@link Catalog}.
 */
export class CatalogConfiguration {

  /**
   * List of types which can be searched within a catalog.
   * 
   * The types match the type part of the url within the
   * eonum API.
   * Example: '/de/drgs/V1.0/P056' -> 'drgs' is the type
   */
  public searchableTypes: string[];

  /**
   * List of types which can be retrieved from a catalog.
   * 
   * The types match the type part of the url within the
   * eonum API.
   * Example: '/de/drgs/V1.0/P056' -> 'drgs' is the type
   */
  public retrievableTypes: string[];

  /**
   * The param of the eonum API which is used to retrieved
   * the list of versions supported by a catalog.
   * 
   * Example: '/de/drgs/versions' -> 'drgs' is the versionParam
   */
  public versionParam: string;
}
