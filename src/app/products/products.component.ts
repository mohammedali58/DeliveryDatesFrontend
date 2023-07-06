import { Component } from '@angular/core';
import { HttpRequests } from 'src/services/http-requests';
import { ProductType } from '../enums/product-type.enum';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products!: any;
  httpError!: boolean;
  httpErrorMessage!: string;
  addToCartNotify = false;

  constructor(private readonly httpRequests: HttpRequests) {}
  ngOnInit() {
    this.httpRequests.getAllProducts().subscribe((data) => {
      this.products = data;
    });

    this.httpRequests.$httpError.subscribe((value) => {
      this.httpError = value;
    });

    this.httpRequests.$httpErrorMessage.subscribe((value) => {
      this.httpErrorMessage = value;
    });
  }

  addToCartHandler(
    productId: string,
    name: string,
    price: number,
    imgUrl: string,
    deliveryDays: number[],
    productType: ProductType,
    daysInAdvance: number
  ) {
    this.addToCartNotify = true;
    this.httpRequests
      .addToCart(
        productId,
        name,
        price,
        imgUrl,
        deliveryDays,
        productType,
        daysInAdvance
      )
      .subscribe((data) => {});
  }

  closeNotifyHandler() {
    this.addToCartNotify = false;
  }

  closeErrorHandler() {
    this.httpError = false;
  }
}
