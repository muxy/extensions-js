import { MessengerType } from './messenger';
import { PurchaseClientType } from './purchase-client';
import { Environment } from './util';
export interface ServerURLs {
    ServerURL: string;
    PortalURL: string;
    FakeAuthURL: string;
}
export declare enum AuthorizationFlowType {
    TwitchAuth = 0,
    AdminAuth = 1,
    TestAuth = 2,
    Unknown = 3
}
export default class Config {
    static RegisterMoreEnvironments(): void;
    static DefaultMessengerType(env: Environment): MessengerType;
    static DefaultPurchaseClientType(env: Environment): PurchaseClientType;
    static GetAuthorizationFlowType(env: Environment): AuthorizationFlowType;
    static CanUseTwitchAPIs(env: Environment): boolean;
    static GetServerURLs(env: Environment): ServerURLs;
    static OtherEnvironmentCheck(window: Window | any): Environment | undefined;
}
