import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/models/Order';
import { selectedCategory } from 'src/models/selectedCategory';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
    cat: selectedCategory = new selectedCategory;
    orderList: Order[] = [];
    sOrder: Order[] = [];
    mockDbUrl = 'http://localhost:3000/Orders'
   
    constructor(private httpClient: HttpClient) { }
    
    getOrders(): Observable<Order[]> { 
        return this.httpClient.get<Order[]>(this.mockDbUrl).pipe(
            map(response => response)
        );
    }

    createSelectedCat(): selectedCategory{
        this.getOrders().subscribe( orders => {
            this.orderList = orders;
    
            for (let order of this.orderList) { 
                if (order.category == "Fajita") { 
                    this.sOrder.push(order);
                }
            }
        
            this.cat.name = "Fajita";
            this.cat.meal = this.sOrder;
            
        });
        return this.cat;
    }

    getCat(): selectedCategory { 
        if (this.cat == undefined) { 
            this.createSelectedCat();
        }
        return this.cat;
    }

    modifyCat(newCat: string): selectedCategory { 
        return this.cat;
    }
}
