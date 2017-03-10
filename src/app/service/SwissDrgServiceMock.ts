import { ISwissDrgService } from "./ISwissDrgService";
import { Injectable } from "@angular/core";
import { SwissDrgElement } from "../catalog/SwissDrgElement";

import { OpaqueToken } from '@angular/core';

export let SERVICE_MOCK = new OpaqueToken('SwissDrgServiceMock');

export class SwissDrgServiceMock implements ISwissDrgService {
    private CONTENTS: SwissDrgElement[] = [
        { code: "Content 1", text: "Description content 1", url: "/url/to/content1" },
        { code: "Content 2", text: "Description content 2", url: "/url/to/content2" },
        { code: "Content 3", text: "Description content 3", url: "/url/to/content3" },
        { code: "Content 4", text: "Description content 4", url: "/url/to/content4" },
        { code: "Content 5", text: "Description content 5", url: "/url/to/content5" },
        { code: "Content 6", text: "Description content 6", url: "/url/to/content6" },
        { code: "Content 7", text: "Description content 7", url: "/url/to/content7" }
    ];

    search(version: string, search: string): SwissDrgElement[] {
        return this.CONTENTS;
    }
    getVersions(): string[] {
        return [ "V1.0","V2.0","V3.0","V4.0" ];
    }
    getByCode(code: string): SwissDrgElement {
        throw new Error('Method not implemented.');
    }
}