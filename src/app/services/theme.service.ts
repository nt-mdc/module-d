import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = (localStorage.getItem('app_theme') as any) || 'system';

  setTheme(t: 'light' | 'dark' | 'system') {
    this.theme = t;
    localStorage.setItem('app_theme', t);
    this.apply();
  }

  get(): 'light' | 'dark' | 'system' {
    return this.theme;
  }

  private getEffective(): 'light' | 'dark' {
    return this.theme == 'system'
      ? matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : this.theme;
  }

  private apply() {
    document.documentElement.setAttribute('data-bs-theme', this.getEffective());
  }

  constructor(){
    this.apply();
  }
}
