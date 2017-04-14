import { CatalogElement } from "../model/catalog.element";
import { RememberElementService } from "./remember.element.service";

describe('Remember element service test', () => {

    it('Should have no remembered elements initially', () => {
        const rememberService = new RememberElementService();
        expect(rememberService.count()).toBe(0);
    });

    it('Should increase number of elements when adding new element', () => {
        const rememberService = new RememberElementService();
        const element = new CatalogElement();
        element.code = '1234';
        rememberService.add(element);
        expect(rememberService.count()).toBe(1);
    });

    it('Should not increase number of elements when adding already added element', () => {
        const rememberService = new RememberElementService();
        const element = new CatalogElement();
        element.code = '1234';
        rememberService.add(element);
        rememberService.add(element);
        expect(rememberService.count()).toBe(1);
    });

    it('Should increase number of elements accordingly when adding multiple elements', () => {
        const rememberService = new RememberElementService();
        for(let i: number = 0; i < 50; i++){
            const element = new CatalogElement();
            element.code = i.toString();
            rememberService.add(element);
        }
        expect(rememberService.count()).toBe(50);
    });

    it('Should decrease number of elements when removing an element', () => {
        const rememberService = new RememberElementService();
        const element = new CatalogElement();
        element.code = '1234';
        rememberService.add(element);
        rememberService.remove('1234');
        expect(rememberService.count()).toBe(0);
    });

    it('Should not decrease number of elements when removing an element from empty list', () => {
        const rememberService = new RememberElementService();
        rememberService.remove('1234');
        expect(rememberService.count()).toBe(0);
    });

    it('Should return a list of all remembered codes', () => {
        const rememberService = new RememberElementService();
        const element = new CatalogElement();
        rememberService.add(element);
        const elements: CatalogElement[] = rememberService.getRememberedElements();
        expect(elements.length).toBe(1);
        expect(elements[0]).toBe(element);
    });

    it('Should notify subscriber on adding element', () => {
        let callBackCalled: boolean = false;
        
        let callback = () => {
            callBackCalled = true;
        };

        const rememberService = new RememberElementService();
        rememberService.subscribe(callback);
        const element = new CatalogElement();
        element.code = '1234';
        rememberService.add(element);

        expect(callBackCalled).toBe(true);
    });

    it('Should notify subscriber on removing element', () => {
        let callBackCalled: boolean = false;
        
        let callback = () => {
            callBackCalled = true;
        };

        const rememberService = new RememberElementService();
        const element = new CatalogElement();
        element.code = '1234';
        rememberService.add(element);

        rememberService.subscribe(callback);
        rememberService.remove('1234');

        expect(callBackCalled).toBe(true);
    });
})