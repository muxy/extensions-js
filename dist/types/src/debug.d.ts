/**
 * @module SDK
 */
export interface DebugOptions {
    url?: string;
    channelID?: string;
    userID?: string;
    role?: string;
    jwt?: string;
    environment?: string;
    onPubsubListen?: (...args: any[]) => void;
    onPubsubReceive?: (...args: any[]) => void;
    onPubsubSend?: (...args: any[]) => void;
}
export declare class DefaultDebugOptions implements DebugOptions {
    onPubsubListen: (...args: any[]) => void;
    onPubsubReceive: (...args: any[]) => void;
    onPubsubSend: (...args: any[]) => void;
}
export declare class DebuggingOptions {
    options: DebugOptions;
    constructor();
    url(url: any): this;
    channelID(cid: any): this;
    userID(uid: any): this;
    role(r: any): this;
    jwt(j: any): this;
    environment(e: any): this;
    onPubsubSend(cb: any): this;
    onPubsubReceive(cb: any): this;
    onPubsubListen(cb: any): this;
    private readFromQuery;
}
