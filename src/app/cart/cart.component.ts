import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpRequests } from 'src/services/http-requests';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartProducts!: any[];
  deliveryDatesOutdated = true;
  requestDays = false;
  postalCode = '';
  deliveryDates: {
    postalCode: string;
    formattedDate: string;
    isGreenDelivery: boolean;
  }[] = [];
  getCartSubs!: Subscription;
  removeProductsSubs!: Subscription;
  constructor(private readonly httpRequests: HttpRequests) {}
  ngOnInit() {
    this.getCartSubs = this.httpRequests.getCartProducts().subscribe((data) => {
      this.cartProducts = data;
    });
  }

  removeFromCartHandler(id: number) {
    this.deliveryDatesOutdated = true;
    this.requestDays = false;
    this.removeProductsSubs = this.httpRequests
      .removeFromCart(id)
      .subscribe((data) => {
        this.cartProducts = data;
      });
  }

  getDeliveryDatesHandler() {
    if (!this.postalCode) {
      this.requestDays = true;
      return;
    }
    this.requestDays = false;
    this.deliveryDatesOutdated = false;
    this.httpRequests
      .getDeliveryDates(this.postalCode)
      .subscribe((data) => (this.deliveryDates = data));
  }

  ngOnDestroy() {
    if (this.removeProductsSubs) {
      this.removeProductsSubs.unsubscribe();
    }
    this.getCartSubs.unsubscribe();
  }
}
