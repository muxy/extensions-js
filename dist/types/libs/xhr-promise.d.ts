export interface XHROptions {
    url?: string;
    method?: string;
    data?: string;
    headers?: object;
}
export interface XHRResponse {
    url: string;
    status: number;
    statusText: string;
    responseText: object;
    headers: object;
    xhr: XMLHttpRequest;
}
export default class XHRPromise {
    options: XHROptions;
    xhr: XMLHttpRequest;
    constructor(options?: XHROptions);
    send(): Promise<XHRResponse>;
    getXHR(): XMLHttpRequest;
    getAllResponseHeaders(): object;
    getResponseText(): string | object;
    getResponseURL(): string;
    handleResponse(reason: string, response: (reason?: any) => void, status?: number | null, statusText?: string): void;
}
export declare function __queueResponseMock(response: string): void;
export declare function reset(): void;
