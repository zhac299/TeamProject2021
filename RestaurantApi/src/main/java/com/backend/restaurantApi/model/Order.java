package com.backend.restaurantApi.model;

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

    @Column(name = "customerTable", nullable = false)
    private int customerTableNum;

    @JsonManagedReference(value = "order")
    @Column(name = "meal", nullable = false)
    @OneToMany(cascade = CascadeType.ALL, mappedBy="order")
    private List<Meal> meal;

    @Column(name = "staff", nullable = false)
    private long waiterId;

    @Column(name = "is_delivered")
    private boolean isDelivered = false;

    @Column(name = "order_placed_time")
    @CreationTimestamp
    private Date orderPlacedTime = new Date();

    // used to serialize object to json
    @Override
    public String toString() {
        return "DishAllergies{" +
            "id=" + id +
            ", customerTableNum='" + customerTableNum + '\'' +
            ", meal='" + meal + '\'' +
            ", waiterId='" + waiterId + '\'' +
            ", isDelivered='" + isDelivered+ '\'' +
            ", orderPlacedTime='" + orderPlacedTime+ '\'' +
            '}';
    }

    public Order() {}

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

    public int getCustomerTableNum() {
        return customerTableNum;
    }

    public void setCustomerTableNum(int customerTableNum) {
        this.customerTableNum = customerTableNum;
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
