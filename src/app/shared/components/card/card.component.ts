import { Component, Input } from '@angular/core';
import { ProductObject } from '../../../core/models/products/product-object.interface';
import { TermPipe } from '../../pipes/term/term-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [TermPipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() product!: ProductObject;
}
