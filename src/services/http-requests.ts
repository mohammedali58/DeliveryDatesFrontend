import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, take, tap, throwError } from 'rxjs';
import { ProductType } from 'src/app/enums/product-type.enum';
import { Product } from 'src/app/types/products';

@Injectable({ providedIn: 'root' })
export class HttpRequests {
  $httpError = new BehaviorSubject<boolean>(false);
  $httpErrorMessage = new BehaviorSubject<string>('');
  constructor(private readonly http: HttpClient) {}

  getAllProducts() {
    return this.http
      .get<{ status: boolean; messages: string[]; data: Product[] }>(
        'http://localhost:3550/products/all'
      )
      .pipe(
        take(1),
        map((response) => {
          return response?.data;
        }),
        catchError((error) => {
          return throwError(() => {
            this.$httpError.next(true);
            this.$httpErrorMessage.next(error?.error?.messages[0]);
          });
        })
      );
  }

  getCartProducts() {
    return this.http
      .get<{ status: boolean; messages: string[]; data: Product[] }>(
        'http://localhost:3550/products/cart'
      )
      .pipe(
        take(1),
        map((response) => {
          return response?.data;
        }),
        catchError((error) => {
          return throwError(() => {
            this.$httpError.next(true);
            this.$httpErrorMessage.next(error?.error?.messages[0]);
          });
        })
      );
  }

  addToCart(
    productId: string,
    name: string,
    price: number,
    imgUrl: string,
    deliveryDays: number[],
    productType: ProductType,
    daysInAdvance: number
  ) {
    return this.http
      .post<{ status: boolean; messages: string[]; data: Product[] }>(
        'http://localhost:3550/products/cart',
        {
          productId,
          name,
          price,
          imgUrl,
          deliveryDays,
          productType,
          daysInAdvance,
        }
      )
      .pipe(
        take(1),
        tap(),
        map((response) => {
          return response?.data;
        }),
        catchError((error) => {
          return throwError(() => {
            this.$httpError.next(true);
            this.$httpErrorMessage.next(error?.error?.messages[0]);
          });
        })
      );
  }

  removeFromCart(id: number) {
    return this.http
      .delete<{ status: boolean; messages: string[]; data: Product[] }>(
        `http://localhost:3550/products/cart/${id}`
      )
      .pipe(
        take(1),
        map((response) => {
          return response?.data;
        }),
        catchError((error) => {
          return throwError(() => {
            this.$httpError.next(true);
            this.$httpErrorMessage.next(error?.error?.messages[0]);
          });
        })
      );
  }

  getDeliveryDates(postalCode: string) {
    return this.http
      .get<{ status: boolean; messages: string[]; data: any[] }>(
        `http://localhost:3550/products/delivery/${postalCode}`
      )
      .pipe(
        take(1),
        map((response) => {
          return response?.data;
        }),
        catchError((error) => {
          return throwError(() => {
            this.$httpError.next(true);
            this.$httpErrorMessage.next(error?.error?.messages[0]);
          });
        })
      );
  }
}
