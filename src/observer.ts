export default class Observer<Observable> {
  private observers: Array<IObserverHandler<Observable>> = [];

  public register(observer: IObserverHandler<Observable>): void {
    this.observers.push(observer);
  }

  public unregister(observer: IObserverHandler<Observable>): void {
    const n: number = this.observers.indexOf(observer);
    this.observers.splice(n, 1);
  }

  public notify(obj: Observable): void {
    let i: number, max: number;

    for (i = 0, max = this.observers.length; i < max; i += 1) {
      this.observers[i].notify(obj);
    }
  }
}

export class IObserverHandler<Observable> {
  public notify(obj: Observable): void {
    throw new Error('Abstract Method!');
  }
}
