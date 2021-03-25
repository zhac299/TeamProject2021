package com.backend.restaurantApi.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
/**
 * Model for the MenuIngredient.
 */
@Entity
@Table(name = "menu_ingredient")
public class MenuIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "restaurant_menu_item", nullable = false)
    private Menu menu;

    @ManyToOne
    @JoinColumn(name = "ingredient", nullable = false)
    private Ingredient ingredient;

	/**
	 * Getter for the id.
	 * @return id.
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Setter for the id.
	 * @param id to set to.
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Getter for the menu.
	 * @return the menu object.
	 */
	public Menu getMenu() {
		return menu;
	}

	/**
	 * Setter for the menu.
	 * @param menu the menu to set to.
	 */
	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	/**
	 * Getter for the Ingredient.
	 * @return and Ingreident object.
	 */
	public Ingredient getIngredient() {
		return ingredient;
	}

	/**
	 * Setter for the ingredient.
	 * @param ingredient to set to.
	 */
	public void setIngredient(Ingredient ingredient) {
		this.ingredient = ingredient;
	}

	@Override
	public String toString() {
		return "MenuIngredient [id=" + id + ", menu=" + menu + ", ingredient=" + ingredient + "]";
	}
}
