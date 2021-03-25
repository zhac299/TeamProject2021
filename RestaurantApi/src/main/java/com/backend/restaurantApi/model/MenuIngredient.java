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

	/**
	 * The primary key of the table.
	 */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

	/**
	 * The Foreign Key relation to Menu. This is a ManyToOne relation
	 * as there can be many ingredients in a dish.
	 */
    @ManyToOne
    @JoinColumn(name = "restaurant_menu_item", nullable = false)
    private Menu menu;

	/**
	 * The Foreign Key relation to each ingredient. This is a ManyToOne relation
	 * as one ingredient can be used in multiple Menu items.
	 */
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

	/**
	 * ToString method to convert model in backend to more readable form if needed.
	 * 
	 * @return all attributes of model in a more readable format.
	 */
	@Override
	public String toString() {
		return "MenuIngredient [id=" + id + ", menu=" + menu + ", ingredient=" + ingredient + "]";
	}
}
