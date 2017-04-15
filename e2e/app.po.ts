import { browser, element, by } from 'protractor';
import { promise } from '@types/selenium-webdriver';

export class AngularSamplePage {
  public navigateTo(): promise.Promise<any> {
    return browser.get('/');
  }

  public getParagraphText(): promise.Promise<string> {
    return element(by.css('app-root h1')).getText();
  }
}
