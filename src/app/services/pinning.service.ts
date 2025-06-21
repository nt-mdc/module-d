import { Injectable } from '@angular/core';

const pinned_carparks_key = "pinnedCarparks"

@Injectable({
  providedIn: 'root'
})
export class PinningService {

  private pinnedIds: Set<string>;

  constructor() {
    const savedPins = localStorage.getItem(pinned_carparks_key);
    this.pinnedIds = savedPins ? new Set(JSON.parse(savedPins)) : new Set();
  }

  private saveToLS() {
    localStorage.setItem(pinned_carparks_key, JSON.stringify(Array.from(this.pinnedIds)));
  }

  isPinned(carparkName: string): boolean {
    return this.pinnedIds.has(carparkName);
  }

  pin(carparkName: string) {
    this.pinnedIds.add(carparkName);
    this.saveToLS();
  }

  unpin(carparkName: string) {
    this.pinnedIds.delete(carparkName);
    this.saveToLS();
  }


}
