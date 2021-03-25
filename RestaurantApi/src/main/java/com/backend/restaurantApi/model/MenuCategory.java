package com.backend.restaurantApi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

/**
 * Model for the MenuCategory.
 */
@Entity
@Table
@JsonIgnoreProperties(value = { "menu" })
public class MenuCategory {

    /**
	 * The primary key of the table.
	 */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /**
     * The name of the category.
     */
    @Column
    private String category;

    /**
     * This is used to relate each menu item to a category via a
     * Foreign Key. This model has a OneToMany relationship with
     * Menu.
     */
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Menu> menus;

    /**
     * The default constructor.
     */
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
