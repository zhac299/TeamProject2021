package com.backend.restaurantApi.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "restaurant_order")
public class Order implements Comparable<Order> {
    @Id
    @Column(name = "order_id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonManagedReference(value = "order")
    @Column(name = "meal", nullable = false)
    @OneToMany(cascade = CascadeType.ALL, mappedBy="order", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Meal> meal;

    @Column(name = "staff", nullable = false)
    private long waiterId;

    @Column(name = "is_delivered")
    private boolean isDelivered = false;

    @Column(name = "order_placed_time")
    @CreationTimestamp
    private Date orderPlacedTime = new Date();

    @JsonBackReference(value = "customer_order")
    @ManyToOne(cascade = CascadeType.REMOVE, optional = false)
    @JoinColumn(name = "customer", nullable = true)
    private Customer customer;

    @Column(name="is_paid")
    private boolean isPaid = false;

    @Column(name = "total")
    private int total;

    // used to serialize object to json
    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", meal=" + meal +
                ", waiterId=" + waiterId +
                ", isDelivered=" + isDelivered +
                ", orderPlacedTime=" + orderPlacedTime +
                ", customer=" + customer +
                '}';
    }

    public Order() {}

    public boolean getIsPaid() {
        return this.isPaid;
    }

    public void setIsPaid(boolean isPaid) {
        this.isPaid = isPaid;    
    }

    public int getTotal() {
        return this.total;
    }

    public void setTotal(int total) {
        this.total = total;    
    }

    public long getId() {
        return id;
    }

    public void setOrderId(Long id) {
        this.id = id;
    }

    public List<Meal> getMeal() {
        return meal;
    }

    public void setMeal(List<Meal> meal) {
        this.meal = meal;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isDelivered() {
        return isDelivered;
    }

    public void setDelivered(boolean delivered) {
        isDelivered = delivered;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public long getWaiterId() {
        return waiterId;
    }

    public void setWaiterId(long waiterId) {
        this.waiterId = waiterId;
    }

    public void setIsDelivered(boolean isDelivered) {
        this.isDelivered = isDelivered;
    }

    public boolean getIsDelivered() {
        return this.isDelivered;
    }

    public Date getOrderPlacedTime() {
        return this.orderPlacedTime;
    }

    public void setOrderPlacedTime(Date orderPlacedTime) {
        this.orderPlacedTime = orderPlacedTime;
    }

    @Override
    public int compareTo(Order order) {
        return getOrderPlacedTime().compareTo(order.getOrderPlacedTime());
    }

}
