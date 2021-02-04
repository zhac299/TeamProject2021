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
  
    @Column(name = "customer", nullable = true)
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy="order", targetEntity=Customer.class)
    private List<Customer> customer;
  
    @Column(name = "starter", nullable = true)
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy="order", targetEntity=Starter.class)
    private List<Starter> starter;

    @Column(name = "main", nullable = true)
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy="order", targetEntity=Main.class)
    private List<Main> main;

    @Column(name = "side", nullable = true)
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy="order", targetEntity=Side.class)
    private List<Side> side;

    @Column(name = "desert", nullable = true)
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy="order", targetEntity=Desert.class)
    private List<Desert> desert;

    @Column(name = "drink", nullable = true)
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy="order", targetEntity=Drink.class)
    private List<Drink> drink;

    @Column(name = "staff", nullable = true)
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy="order", targetEntity=Staff.class)
    private List<Staff> staff;
  
    // used to serialize object to json
    @Override
    public String toString() {
        return "DishAllergies{" +
            "id=" + id +
            ", customer='" + customer + '\'' +
            ", starter='" + starter + '\'' +
            ", main='" + main + '\'' +
            ", side='" + side + '\'' +
            ", desert='" + desert + '\'' +
            ", drink='" + drink + '\'' +
            ", staff='" + staff + '\'' +
            '}';
    }

//    public Order(Starter starter, Customer customer, Staff staff) {
//        this.starter.add(starter);
//        this.main = null;
//        this.side = null;
//        this.desert = null;
//        this.drink = null;
//        this.customer.add(customer);
//        this.staff.add(staff);
//    }
//
//    public Order(Main main, Customer customer, Staff staff) {
//        this.starter = null;
//        this.main.add(main);
//        this.side = null;
//        this.desert = null;
//        this.drink = null;
//        this.customer.add(customer);
//        this.staff.add(staff);
//    }
//
//    public Order(Side side, Customer customer, Staff staff) {
//        this.starter = null;
//        this.main = null;
//        this.side.add(side);
//        this.desert = null;
//        this.drink = null;
//        this.customer.add(customer);
//        this.staff.add(staff);
//    }
//
//    public Order(Desert desert, Customer customer, Staff staff) {
//        this.starter = null;
//        this.main = null;
//        this.side = null;
//        this.desert.add(desert);
//        this.drink = null;
//        this.customer.add(customer);
//        this.staff.add(staff);
//    }
//
//    public Order(Drink drink, Customer customer, Staff staff) {
//        this.starter = null;
//        this.main = null;
//        this.side = null;
//        this.desert = null;
//        this.drink.add(drink);
//        this.customer.add(customer);
//        this.staff.add(staff);
//    }
//
    public Order() {}
//
//    public List<Starter> getStarter() {
//        return this.starter;
//    }
//
//    public List<Main> getMain() {
//        return this.main;
//    }
//
//    public List<Side> getSide() {
//        return this.side;
//    }
//
//    public List<Desert> getDesert() {
//        return this.desert;
//    }
//
//    public List<Drink> getDrink() {
//        return this.drink;
//    }
//
//    public List<Customer> getCustomer() {
//        return this.customer;
//    }
//
//    public List<Staff> getStaff() {
//        return this.staff;
//    }
}
