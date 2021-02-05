package com.backend.restaurantApi.model;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "RestaurantOrder")
public class Order {
    @Id
    @Column(name = "order_id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "customer", nullable = false)
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy="order", targetEntity=Customer.class)
    private List<Customer> customer;

//    @Column(name = "meal", nullable = false)
//    @OneToMany(cascade = CascadeType.REMOVE, mappedBy="order", targetEntity=Meal.class)
//    private List<Meal> meal;

    @Column(name = "staff", nullable = false)
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy="order", targetEntity=Staff.class)
    private List<Staff> staff;

    // used to serialize object to json
    @Override
    public String toString() {
        return "DishAllergies{" +
            "id=" + id +
            ", customer='" + customer + '\'' +
//            ", meal='" + meal + '\'' +
            ", staff='" + staff + '\'' +
            '}';
    }

   public Order(Meal meal, Customer customer, Staff staff) {
//       this.meal.add(meal);
       this.customer.add(customer);
       this.staff.add(staff);
   }

    public Order() {}

//   public List<Meal> getMeal() {
//       return this.meal;
//   }

   public List<Customer> getCustomer() {
       return this.customer;
   }

   public List<Staff> getStaff() {
       return this.staff;
   }
}
