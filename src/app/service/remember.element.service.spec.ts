import { CatalogElement } from "../model/catalog.element";
import { RememberElementService } from "./remember.element.service";
import { RememberedElement } from "../model/remembered.element";

describe('Remember element service test', () => {

    this.createElement = (code: string) => {
        const element = new CatalogElement();
        element.code = code;
        element.version = 'V1.0';
        element.type = 'drgs';
        return element;
    }

    it('Should have no remembered elements initially', () => {
        const rememberService = new RememberElementService();
        expect(rememberService.count()).toBe(0);
    });

    it('Should increase number of elements when adding new element', () => {
        const rememberService = new RememberElementService();
        const element = this.createElement('1234');
        rememberService.add(element, 'icd', 'de');
        expect(rememberService.count()).toBe(1);
    });

    it('Should not increase number of elements when adding already added element', () => {
        const rememberService = new RememberElementService();
        const element = this.createElement('1234');
        rememberService.add(element, 'icd', 'de');
        rememberService.add(element, 'icd', 'de');
        expect(rememberService.count()).toBe(1);
    });

    it('Should increase number of elements accordingly when adding multiple elements', () => {
        const rememberService = new RememberElementService();
        for(let i: number = 0; i < 50; i++){
            const element = this.createElement(i.toString());
            rememberService.add(element, 'icd', 'de');
        }
        expect(rememberService.count()).toBe(50);
    });

    it('Should decrease number of elements when removing an element', () => {
        const rememberService = new RememberElementService();
        const element = this.createElement('1234');
        const key = RememberedElement.getKeyFor(element, 'icd', 'de');
        rememberService.add(element, 'icd', 'de');

        rememberService.remove(key);

        expect(rememberService.count()).toBe(0);
    });

    it('Should not decrease number of elements when removing an element not in list', () => {
        const rememberService = new RememberElementService();
        const element = this.createElement('1234');
        rememberService.add(element, 'icd', 'de');

        rememberService.remove('not_a_key');

        expect(rememberService.count()).toBe(1);
    });

    it('Should not decrease number of elements when removing an element from empty list', () => {
        const rememberService = new RememberElementService();
        rememberService.remove('1234');
        expect(rememberService.count()).toBe(0);
    });

    it('Should return a list of all remembered codes', () => {
        const rememberService = new RememberElementService();
        const element = this.createElement('1234');
        rememberService.add(element, 'icd', 'de');
        const elements: RememberedElement[] = rememberService.getRememberedElements();
        expect(elements.length).toBe(1);
        expect(elements[0].code).toBe('1234');
    });

    it('Should notify subscriber on adding element', () => {
        let callBackCalled: boolean = false;
        
        let callback = () => {
            callBackCalled = true;
        };

        const rememberService = new RememberElementService();
        rememberService.subscribe(callback);
        const element = this.createElement('1234');
        rememberService.add(element, 'icd', 'de');

        expect(callBackCalled).toBe(true);
    });

    it('Should notify subscriber on removing element', () => {
        let callBackCalled: boolean = false;
        
        let callback = () => {
            callBackCalled = true;
        };

        const rememberService = new RememberElementService();

        const element = this.createElement('1234');
        const key = RememberedElement.getKeyFor(element, 'icd', 'de');
        rememberService.add(element, 'icd', 'de');

        rememberService.subscribe(callback);
        rememberService.remove(key);

        expect(callBackCalled).toBe(true);
    });
});