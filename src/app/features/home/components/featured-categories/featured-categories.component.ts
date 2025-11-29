import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { CategoriesObject } from '../../../../core/models/categories/categories-object.interface';

@Component({
  selector: 'app-featured-categories',
  imports: [CarouselModule],
  templateUrl: './featured-categories.component.html',
  styleUrl: './featured-categories.component.css',
})
export class FeaturedCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categoriesList: CategoriesObject[] = [];
  categoriesCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayHoverPause: true,
    autoplaySpeed: 3500,
    margin: 15,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
  ngOnInit(): void {
    this.getCategoriesData();
  }
  getCategoriesData(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
