import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, TieredMenuModule, CarouselModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('menu') menu!: TieredMenu;
  items: MenuItem[];
  showTieredMenu: boolean = false;

  constructor() {
    this.items = [
      { label: 'Home', routerLink: '/' },
      { label: 'About', routerLink: '/about-us' },
      { label: 'Cart', routerLink: '/cart' }
    ];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.showTieredMenu = window.innerWidth <= 576;
  }

  toggleMenu(event: Event) {
    this.menu.toggle(event);
  }
}
