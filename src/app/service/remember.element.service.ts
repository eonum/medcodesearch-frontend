import { Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";
import { RememberedElement } from "../model/remembered.element";
import { Catalog } from "../catalog/catalog";

@Injectable()
export class RememberElementService {

    private rememberedElements: {[key: string]: RememberedElement};
    private numberOfElements: number;

    private subscribers: (() => void)[];

    public constructor(){
        this.rememberedElements = {};
        this.numberOfElements = 0;
        this.subscribers = [];
    }

    public count(): number {
        return this.numberOfElements;
    }

    public add(element: CatalogElement, catalog: string, language: string): void {
        const elementToStore = RememberedElement.from(element, catalog, language);
        if (!this.rememberedElements[elementToStore.getId()]){
            this.rememberedElements[elementToStore.getId()] = elementToStore; 
            this.numberOfElements++;
            this.notify();
        }
    }

    public remove(id: string): void {
        if (this.rememberedElements[id]){
            delete this.rememberedElements[id];
            this.numberOfElements--;
            this.notify();
        }
    }

    public getRememberedElements(): RememberedElement[] {
        const elements = [];
        const keys = Object.keys(this.rememberedElements);
        keys.forEach(key => {
            elements.push(this.rememberedElements[key]);
        });
        return elements;
    }

    public subscribe(callback: () => void): void {
        this.subscribers.push(callback);
    }

    private notify(): void {
        this.subscribers.forEach(callback => {
            callback();
        });
    }
}