/**
 * @module SDK
 */
export declare class ObserverHandler<Observable> {
    notify(obj: Observable): void;
}
export default class Observer<Observable> {
    private observers;
    register(observer: ObserverHandler<Observable>): void;
    unregister(observer: ObserverHandler<Observable>): void;
    notify(obj: Observable): void;
}
