import { DebugOptions } from './debug';
export declare enum MessengerType {
    Pusher = 0,
    Twitch = 1,
    Server = 2,
    Unknown = 3
}
export declare class CallbackHandle {
    target: string;
    cb: (t: any, datatype: string, message: string) => void;
}
export interface Messenger {
    channelID: string;
    extensionID: string;
    send(id: any, event: any, target: any, body: any, client: any): void;
    listen(id: any, topic: any, callback: (parsedObject: object) => void): CallbackHandle;
    unlisten(id: any, CallbackHandle: any): void;
    close(): void;
}
export declare type ListenCallback<Payload> = (p: Payload, event: string) => void;
export interface MessageEnvelope<Payload> {
    data: Payload;
    event: string;
}
export default function DefaultMessenger(debug: DebugOptions): Messenger;
