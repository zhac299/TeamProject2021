package com.backend.restaurantApi.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;
/**
 * Model for the MenuCategory.
 */
@Entity
@Table
@JsonIgnoreProperties(value = { "menu" })
public class MenuCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column
    private String category;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Menu> menus;

    public MenuCategory(){};

    /**
     * Getter for the id.
     * @return long representing id.
     */
    public Long getId() {
        return id;
    }

    /**
     * Setter for id.
     * @param id to set to.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Getter for the category.
     * @return String representing category.
     */
    public String getCategory() {
        return category;
    }

    /**
     * Setter for the category.
     * @param category to set to.
     */
    public void setCategory(String category) {
        this.category = category;
    }

    /**
     * Getter for the menu.
     * @return list of Menus.
     */
    public List<Menu> getMenu() {
        return menus;
    }

    /**
     * Setter for the menu.
     * @param menus list of menu items.
     */
    public void setMenu(List<Menu> menus) {
        this.menus = menus;
    }
}
