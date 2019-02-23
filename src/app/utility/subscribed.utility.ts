import { Subscription } from "rxjs";

export class Subscribed {
  private subscriptions: Subscription[] = [];

  protected subscribe(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  protected unsubscribe(subscription: Subscription): void {
    subscription.unsubscribe();
    delete (this.subscriptions[this.subscriptions.indexOf(subscription)]);
  }

  protected unsubscribeAll(): void {
    this.subscriptions.forEach((subscription, index) => {
      subscription.unsubscribe();
      delete (this.subscriptions[index]);
    });
  }
}