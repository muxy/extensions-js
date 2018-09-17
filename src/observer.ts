export default class Observer<Observable> {
  private observers: Array<ObserverHandler<Observable>> = [];

  public register(observer: ObserverHandler<Observable>): void {
    this.observers.push(observer);
  }

  public unregister(observer: ObserverHandler<Observable>): void {
    const n: number = this.observers.indexOf(observer);
    this.observers.splice(n, 1);
  }

  public notify(obj: Observable): void {
    let i: number = 0;
    const max: number = this.observers.length;

    for (; i < max; i += 1) {
      this.observers[i].notify(obj);
    }
  }
}

export class ObserverHandler<Observable> {
  public notify(obj: Observable): void {
    throw new Error('Abstract Method!');
  }
}
