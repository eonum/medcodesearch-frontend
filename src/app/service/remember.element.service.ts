import { Injectable } from "@angular/core";
import { CatalogElement } from "../model/catalog.element";

@Injectable()
export class RememberElementService {

    private rememberedElements: {[key: string]: CatalogElement};
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

    public add(element: CatalogElement): void {
        if (!this.rememberedElements[element.code]){
            this.rememberedElements[element.code] = element;
            this.numberOfElements++;
            this.notify();
        }
    }

    public remove(code: string): void {
        if (this.rememberedElements[code]){
            this.rememberedElements[code] = undefined;
            this.numberOfElements--;
            this.notify();
        }
    }

    public getRememberedElements(): CatalogElement[] {
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

    public notify(): void {
        this.subscribers.forEach(callback => {
            callback();
        });
    }
}