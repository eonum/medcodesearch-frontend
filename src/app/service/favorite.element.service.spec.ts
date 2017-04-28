import { CatalogElement } from '../model/catalog.element';
import { FavoriteElement } from '../model/favorite.element';
import { FavoriteElementService } from './favorite.element.service';

describe('FavoriteElementService', () => {

  this.createElement = (code: string) => {
    const element = new CatalogElement();
    element.code = code;
    element.version = 'V1.0';
    element.type = 'drgs';
    return element;
  };

  it('Should have no favorite elements initially', () => {
    const favoriteService = new FavoriteElementService();
    expect(favoriteService.count()).toBe(0);
  });

  it('Should increase number of elements when adding new element', () => {
    const favoriteService = new FavoriteElementService();
    const element = this.createElement('1234');
    favoriteService.add(element, 'V1.0', 'icd', 'de');
    expect(favoriteService.count()).toBe(1);
  });

  it('Should not increase number of elements when adding already added element', () => {
    const favoriteService = new FavoriteElementService();
    const element = this.createElement('1234');
    favoriteService.add(element, 'V1.0', 'icd', 'de');
    favoriteService.add(element, 'V1.0', 'icd', 'de');
    expect(favoriteService.count()).toBe(1);
  });

  it('Should return false if the element is not in list', () => {
    const favoriteService = new FavoriteElementService();
    expect(favoriteService.isFavorite(this.createElement('1234'), 'V1.0', 'icd', 'de')).toBeFalsy();
  });

  it('Should return true if the element is in the list', () => {
    const favoriteService = new FavoriteElementService();
    const element = this.createElement('1234');
    favoriteService.add(element, 'V1.0', 'icd', 'de');
    expect(favoriteService.isFavorite(element, 'V1.0', 'icd', 'de')).toBeTruthy();
  });

  it('Should return false after element is removed from the list', () => {
    const favoriteService = new FavoriteElementService();
    const element = this.createElement('1234');
    favoriteService.add(element, 'V1.0', 'icd', 'de');
    const createdElement = FavoriteElement.from(element, 'V1.0', 'icd', 'de');
    favoriteService.remove(createdElement);
    expect(favoriteService.isFavorite(element, 'V1.0', 'icd', 'de')).toBeFalsy();
  });

  it('Should increase number of elements accordingly when adding multiple elements', () => {
    const favoriteService = new FavoriteElementService();
    for (let i = 0; i < 50; i++) {
      const element = this.createElement(i.toString());
      favoriteService.add(element, 'V1.0', 'icd', 'de');
    }
    expect(favoriteService.count()).toBe(50);
  });

  it('Should decrease number of elements when removing an element', () => {
    const favoriteService = new FavoriteElementService();
    const element = this.createElement('1234');
    const createdElement = FavoriteElement.from(element, 'V1.0', 'icd', 'de');
    favoriteService.add(element, 'V1.0', 'icd', 'de');

    favoriteService.remove(createdElement);

    expect(favoriteService.count()).toBe(0);
  });

  it('Should not decrease number of elements when removing an element not in list', () => {
    const favoriteService = new FavoriteElementService();
    const element = this.createElement('1234');
    favoriteService.add(element, 'V1.0', 'icd', 'de');

    favoriteService.remove(new FavoriteElement());

    expect(favoriteService.count()).toBe(1);
  });

  it('Should not decrease number of elements when removing an element from empty list', () => {
    const favoriteService = new FavoriteElementService();
    favoriteService.remove(new FavoriteElement());
    expect(favoriteService.count()).toBe(0);
  });

  it('Should return a list of all favorite codes', () => {
    const favoriteService = new FavoriteElementService();

    let numberOfElements: number;
    let codeOfFirstElement: string;

    favoriteService.getFavoriteElements().subscribe(elements => {
      numberOfElements = elements.length;
      if (elements.length > 0) {
        codeOfFirstElement = elements[0].code;
      }
    });

    const element = this.createElement('1234');
    favoriteService.add(element, 'V1.0', 'icd', 'de');

    expect(numberOfElements).toBe(1);
    expect(codeOfFirstElement).toBe('1234');
  });

  it('Should notify subscriber on adding element', () => {
    let callBackCalled = false;

    const callback = () => {
      callBackCalled = true;
    };

    const favoriteService = new FavoriteElementService();

    favoriteService.getFavoriteElements().subscribe(element => {
      callback();
    });

    const element = this.createElement('1234');
    favoriteService.add(element, 'V1.0', 'icd', 'de');

    expect(callBackCalled).toBe(true);
  });

  it('Should notify subscriber on removing element', () => {
    let callBackCalled = false;

    const callback = () => {
      callBackCalled = true;
    };

    const favoriteService = new FavoriteElementService();

    const element = this.createElement('1234');
    const createdElement = FavoriteElement.from(element, 'V1.0', 'icd', 'de');
    favoriteService.add(element, 'V1.0', 'icd', 'de');

    favoriteService.getFavoriteElements().subscribe(elements => {
      callback();
    });

    favoriteService.remove(createdElement);

    expect(callBackCalled).toBe(true);
  });
});
