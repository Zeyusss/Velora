import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { FeaturedCategoriesComponent } from './components/featured-categories/featured-categories.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    FeaturedProductsComponent,
    FeaturedCategoriesComponent,
    ContactUsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
