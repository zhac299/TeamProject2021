package com.backend.restaurantApi.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

/**
 * Model which contains and handles the data for Orders.
 */
@Entity
@Table(name = "restaurant_order")
public class Order implements Comparable<Order> {

    /**
	 * The primary key of the table.
	 */
    @Id
    @Column(name = "order_id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /**
     * Foreign key relation betwen order and meal entries. This is OneToMany as 
     * a single order can have multiple meal (dishes).
     */
    @JsonManagedReference(value = "order")
    @Column(name = "meal", nullable = false)
    @OneToMany(cascade = CascadeType.ALL, mappedBy="order", fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Meal> meal;

    /**
     * The id of the waiter assigned to the order.
     */
    @Column(name = "staff", nullable = false)
    private long waiterId;

    /**
     * Indicates if the order has been delivered to the customer or not.
     */
    @Column(name = "is_delivered")
    private boolean isDelivered = false;

    /**
     * Indicates if an order has been confirmed by the waiter or not.
     */
    @Column(name = "is_confirmed")
    private boolean isConfirmed = false;

    /**
     * The date and time the order was placed
     */
    @Column(name = "order_placed_time")
    @CreationTimestamp
    private Date orderPlacedTime = new Date();

    /**
     * The foreign key relation of an order to a customer.
     * This is ManyToOne relation as a single customer can place many order.
     */
    @JsonBackReference(value = "customer_order")
    @ManyToOne(optional = false)
    @JoinColumn(name = "customer", nullable = true)
    private Customer customer;
    
    /**
     * Indicates if an order has been paid for or not.
     */
    @Column(name="is_paid")
    private boolean isPaid = false;

    /**
     * Indicates if an order has been prepared for delivery or not.
     */
    @Column(name="isReady")
    private boolean isReady = false;

    /**
     * The total price of the order.
     */
    @Column(name = "total")
    private int total = 0;

    
    /**
     * Returns data in a more readable format similar to that of a JSON.
     *  
     * @return data of Order in a a more readable format.
     */
    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", meal=" + meal +
                ", waiterId=" + waiterId +
                ", isDelivered=" + isDelivered +
                ", isConfirmed=" + isConfirmed +
                ", orderPlacedTime=" + orderPlacedTime +
                ", customer=" + customer +
                '}';
    }

    /**
     * Default constructor for Order.
     */
    public Order() {}

    
    /** 
     * Gets the Id of the Order and returns it.
     * 
     * @return the id of the Order.
     */
    public long getId() {
        return id;
    }

    
    /** 
     * Assigns the param value to the Order Id.
     * 
     * @param id the value being assigned to the order id.
     */
    public void setOrderId(Long id) {
        this.id = id;
    }

    
    /** 
     * Gets the items in the order and returns them.
     * 
     * @return a list of all the menu items in the order.
     */
    public List<Meal> getMeal() {
        return meal;
    }

    
    /** 
     * Assigns the param value to the meal attribute in Order. Adding dishes to an order.
     * 
     * @param meal the menu items being added to the order.
     */
    public void setMeal(List<Meal> meal) {
        this.meal = meal;
    }
    
    /** 
     * Gets the value of the isDelivered attribute and returns it.
     * 
     * @return the boolean value of the attribute isDelivered.
     */
    public boolean isIsDelivered() {
        return isDelivered;
    }

    
    /** 
     * Assigns the param value to the isDelivered attribute.
     * 
     * @param delivered the value being assigned to isDelivered.
     */
    public void setDelivered(boolean delivered) {
        isDelivered = delivered;
    }

    
    /** 
     * Gets and returns the value of the attribute Customer. Getting the customer who has placed the order
     * 
     * @return the customer who has placed the order.
     */
    public Customer getCustomer() {
        return customer;
    }

    
    /** 
     * Assigns the param value to the attribute customer.
     * 
     * @param customer the customer who has placed the order.
     */
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    
    /** 
     * Gets and returns the waiter assigned to the order.
     * 
     * @return the staff id of the waiter assigned to the order.
     */
    public long getWaiterId() {
        return waiterId;
    }

    
    /** 
     * Assigns a waiter to an order.
     * 
     * @param waiterId the id of the waiter being assigned to the order.
     */
    public void setWaiterId(long waiterId) {
        this.waiterId = waiterId;
    }

    
    /** 
     * Marks an order isDelivered attribute with the value in the param.
     * 
     * @param isDelivered the status of the isDelivered attribute.
     */
    public void setIsDelivered(boolean isDelivered) {
        this.isDelivered = isDelivered;
    }

    
    /** 
     * Gets and returns the status of the order to check if it is confirmed.
     * 
     * @return the status of the confirmation of the order.
     */
    public boolean getIsConfirmed() {
        return this.isConfirmed;
    }

    
    /** 
     * Assigns the param value to the isConfirmed attribute, changing the status of the order.
     * 
     * @param isConfirmed the status of the order, if it has been confirmed or not.
     */
    public void setIsConfirmed(boolean isConfirmed) {
        this.isConfirmed = isConfirmed;
    }

    
    /** 
     * Gets and returns the value of the isDelivered attribute of the Order.
     * 
     * @return the status of the deliver of the order.
     */
    public boolean getIsDelivered() {
        return this.isDelivered;
    }

    
    /** 
     * Gets and returns the date and time the order was placed.
     * 
     * @return the date and time the order was placed.
     */
    public Date getOrderPlacedTime() {
        return this.orderPlacedTime;
    }

    
    /** 
     * Sets a date and time to an order.
     * 
     * @param orderPlacedTime the date and time being set to an order.
     */
    public void setOrderPlacedTime(Date orderPlacedTime) {
        this.orderPlacedTime = orderPlacedTime;
    }

    
    /** 
     * Used to compare the time orders were placed.
     * 
     * @param order the order that this order is being compared to.
     * @return a value of either 1, 0 or -1 indicating if this order has been placed later, before or at the same time as the order it is being compared to.
     */
    @Override
    public int compareTo(Order order) {
        return getOrderPlacedTime().compareTo(order.getOrderPlacedTime());
    }

    
    /** 
     * Gets and returns isPaid indicating if an order has been paid.
     * 
     * @return a value indicating if an order has been paid or not.
     */
    public boolean getIsPaid() {
        return this.isPaid;
    }

    
    /** 
     * Assigns the param value to isPaid.
     * 
     * @param isPaid value indciating if an order has been paid or not.
     */
    public void setIsPaid(boolean isPaid) {
        this.isPaid = isPaid;    
    }

    
    /** 
     * Get and return the isReady attribute of an order.
     * 
     * @return the status of an order, if an order is prepared or not.
     */
    public boolean getIsReady(){
        return this.isReady;
    }

    
    /** 
     * Assign the param value to isReady, assigning it a status value.
     * 
     * @param isReady the status of an order, if it has been cooked or not.
     */
    public void setIsReady(boolean isReady){
        this.isReady = isReady;
    }

    
    /** 
     * Get and return the total of an order.
     * 
     * @return the total cost of the order.
     */
    public int getTotal() {
        return this.total;
    }

    
    /** 
     * Assigns the param value to the total attribute.
     * 
     * @param total the cost of the all the dishes in the menu.
     */
    public void setTotal(int total) {
        this.total = total;    
    }

}