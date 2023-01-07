type Topic = {
  uid: string;
  func: (...args: unknown[]) => unknown;
}

export class PubSub {
  static topics: Record<string, Topic[]> = {};
  static subUID = -1;

  static subscribe(topic: Topic['uid'], func: Topic['func']): string {
    if (!this.topics[topic]) this.topics[topic] = [];
    const uid = (++this.subUID).toString();
    this.topics[topic].push({
      uid,
      func
    });
    return uid;
  }

  static publish(topic: Topic['uid'], args: unknown[]): boolean {
    if (!this.topics[topic]) return false;
    for (const subscriber of this.topics[topic]) {
      subscriber.func(...args);
    }
    return true;
  }
}