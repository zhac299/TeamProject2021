package com.backend.restaurantApi.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Model which contains and handles the data for meals.
 */
@Getter
@Setter
@Entity
@Table(name = "meal")
public class Meal {

    /**
	 * The primary key of the table.
	 */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /**
   * The foreign key of the menu item that references the Menu model.
   * It uses a many to one annotation to realise it and JsonManagedReference
   * to avoid to avoid the infinte JSON serialization problem such that only this item
   * is serialised.
   */
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "menu")
    private Menu menu;

    /**
   * The foreign key of the order that references the Order model.
   * It uses a many to one annotation to realise it and JsonManagedReference
   * to avoid to avoid the infinte JSON serialization problem such that only this item
   * is serialised.
   */
    @JsonBackReference(value = "order")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = true)
    private Order order;

    /**
     * The number of the item the customer has selected.
     */
    @Column(name = "number_selections")
    private int numberSelections;

    /**
     * The default constructor.
     */
    public Meal() {}

    
    /** 
     * Gets the value of the Id for a meal.
     * @return the id of a meal.
     */
    public Long getId() {
        return id;
    }

    
    /** 
     * Assigns a value to the id for a meal.
     * @param id the value being set to id.
     */
    public void setId(Long id) {
        this.id = id;
    }

    
    /** 
     * Gets the number of selections for the meal.
     * @return int the number of selections.
     */
    public int getNumberSelections() {
        return this.numberSelections;
    }

    
    /** 
     * Assigns the parameter value to the variable numberSelections.
     * @param newNumberSelections the value being assigned to numberSelection variable for a meal.
     */
    public void setNumberSelections(int newNumberSelections) {
        this.numberSelections = newNumberSelections;
    }

    
    /** 
     * Gets the menu attribute.
     * @return the Menu item for meal.
     */
    public Menu getMenu() {
        return menu;
    }

    
    /** 
     * Assigns the id parameter to the menu attribute.
     * @param menu_id the value being assigned to menu.
     */
    public void setMenu(Menu menu_id) {
        this.menu = menu_id;
    }

    
    /** 
     * Gets the order attribute and returns it
     * @return the Order attribute.
     */
    public Order getOrder() {
        return order;
    }

    
    /** 
     * Assigns the parameter value order to the order attribute.
     * @param order the value being assigned to the order attribute.
     */
    public void setOrder(Order order) {
        this.order = order;
    }
}