import { IBook, IUser } from "./models";
import { Storage } from "./storage";

export class Library<T extends IBook | IUser> {
  private items: T[] = [];
  private static idKey = "nextId";
  private nextId: number = 1;

  constructor(private storageKey: string) {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const data = Storage.get(this.storageKey);
    if (data) {
      this.items = JSON.parse(data);
    }
    const nextId = Storage.get(Library.idKey);
    if (nextId) {
      this.nextId = parseInt(nextId, 10);
    }
  }

  private saveToStorage(): void {
    Storage.set(this.storageKey, JSON.stringify(this.items));
    Storage.set(Library.idKey, this.nextId.toString());
  }

  private generateId(): string {
    return (this.nextId++).toString();
  }

  add(item: T): string {
    const id = this.generateId();
    (item as any).id = id;
    this.items.push(item);
    this.saveToStorage();
    return id;
  }

  remove(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveToStorage();
  }

  getAll(): T[] {
    return this.items;
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  update(item: T): void {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
      this.saveToStorage();
    }
  }
}
