import { Injectable } from '@angular/core';

/**
 * Communicates with appropriate components to take care of mobile functionality,
 * namely the switching between results and details.
 */
@Injectable()
export class MobileService {

  /**
   * Threshold at which ui switches to mobile.
   * @type {number}
   */
  private mobileThreshold = 700;

  /**
   * Indicates whether or not mobile mode is active.
   */
  private mobile: boolean;

  /**
   * If mobile mode is active, indicates whether details or results are shown.
   */
  private showDetails: boolean;

  /**
   * Search query; used to decide whether or not mobile should be activated.
   */
  private query: string;

  public constructor() {
    this.mobile = false;
    this.showDetails = false;
  }

  /**
   * Called from MainComponent and SearchFormComponent whenever the query is set or updated.
   *
   * @param query the search query
   */
  public setQuery(query: string): void {
    this.query = query;
    this.mobileCheck(window.innerWidth);
  }

  /**
   * Called from MainComponent whenever browser size changes.
   *
   * @param width the width of the browser window
   */
  public resizeWindow(width: number): void {
    this.mobileCheck(width);
  }

  /**
   * Called from MainComponent which sets a class to indicate mobile mode.
   *
   * @returns {boolean} whether or not mobile mode is active
   */
  public getMobile(): boolean {
    return this.mobile;
  }

  /**
   * Called from mainComponent which sets a class to switch between results and details.
   *
   * @returns {boolean} whether or not details are to be shown
   */
  public getShowDetails(): boolean {
    return this.showDetails;
  }

  /**
   * Checks if width is smaller or greater than mobileThreshold and sets mobile.
   *
   * @param width the width of the browser window.
   */
  private mobileCheck(width: number): void {
    if (width < this.mobileThreshold && this.query) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  /**
   * Called from SearchResultsComponent or DetailComponent to switch between results and details.
   *
   * @param focus the "side" to focus on (results or details).
   */
  public focus(focus: string): void {
    if (this.mobile) {
      if (focus === 'details') {
        this.showDetails = true;
      } else {
        this.showDetails = false;
      }
    } else {
      this.showDetails = false;
    }
  }

}
