import { CatalogElement } from '../model/catalog.element';
import { RememberedElement } from '../model/remembered.element';
import { RememberElementService } from './remember.element.service';

describe('RememberElementService', () => {

  this.createElement = (code: string) => {
    const element = new CatalogElement();
    element.code = code;
    element.version = 'V1.0';
    element.type = 'drgs';
    return element;
  };

  it('Should have no remembered elements initially', () => {
    const rememberService = new RememberElementService();
    expect(rememberService.count()).toBe(0);
  });

  it('Should increase number of elements when adding new element', () => {
    const rememberService = new RememberElementService();
    const element = this.createElement('1234');
    rememberService.add(element, 'V1.0', 'icd', 'de');
    expect(rememberService.count()).toBe(1);
  });

  it('Should not increase number of elements when adding already added element', () => {
    const rememberService = new RememberElementService();
    const element = this.createElement('1234');
    rememberService.add(element, 'V1.0', 'icd', 'de');
    rememberService.add(element, 'V1.0', 'icd', 'de');
    expect(rememberService.count()).toBe(1);
  });

  it('Should increase number of elements accordingly when adding multiple elements', () => {
    const rememberService = new RememberElementService();
    for (let i = 0; i < 50; i++) {
      const element = this.createElement(i.toString());
      rememberService.add(element, 'V1.0', 'icd', 'de');
    }
    expect(rememberService.count()).toBe(50);
  });

  it('Should decrease number of elements when removing an element', () => {
    const rememberService = new RememberElementService();
    const element = this.createElement('1234');
    const createdElement = RememberedElement.from(element, 'V1.0', 'icd', 'de');
    rememberService.add(element, 'V1.0', 'icd', 'de');

    rememberService.remove(createdElement);

    expect(rememberService.count()).toBe(0);
  });

  it('Should not decrease number of elements when removing an element not in list', () => {
    const rememberService = new RememberElementService();
    const element = this.createElement('1234');
    rememberService.add(element, 'V1.0', 'icd', 'de');

    rememberService.remove(new RememberedElement());

    expect(rememberService.count()).toBe(1);
  });

  it('Should not decrease number of elements when removing an element from empty list', () => {
    const rememberService = new RememberElementService();
    rememberService.remove(new RememberedElement());
    expect(rememberService.count()).toBe(0);
  });

  it('Should return a list of all remembered codes', () => {
    const rememberService = new RememberElementService();

    let numberOfElements: number;
    let codeOfFirstElement: string;

    rememberService.getRememberedElements().subscribe(elements => {
      numberOfElements = elements.length;
      if (elements.length > 0) {
        codeOfFirstElement = elements[0].code;
      }
    });

    const element = this.createElement('1234');
    rememberService.add(element, 'V1.0', 'icd', 'de');

    expect(numberOfElements).toBe(1);
    expect(codeOfFirstElement).toBe('1234');
  });

  it('Should notify subscriber on adding element', () => {
    let callBackCalled = false;

    const callback = () => {
      callBackCalled = true;
    };

    const rememberService = new RememberElementService();

    rememberService.getRememberedElements().subscribe(element => {
      callback();
    });

    const element = this.createElement('1234');
    rememberService.add(element, 'V1.0', 'icd', 'de');

    expect(callBackCalled).toBe(true);
  });

  it('Should notify subscriber on removing element', () => {
    let callBackCalled = false;

    const callback = () => {
      callBackCalled = true;
    };

    const rememberService = new RememberElementService();

    const element = this.createElement('1234');
    const createdElement = RememberedElement.from(element, 'V1.0', 'icd', 'de');
    rememberService.add(element, 'V1.0', 'icd', 'de');

    rememberService.getRememberedElements().subscribe(elements => {
      callback();
    });

    rememberService.remove(createdElement);

    expect(callBackCalled).toBe(true);
  });
});
