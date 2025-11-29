import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product/product.service';
import { ProductObject } from '../../../../core/models/products/product-object.interface';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-featured-products',
  imports: [CardComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.css',
})
export class FeaturedProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  productList: ProductObject[] = [];
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
