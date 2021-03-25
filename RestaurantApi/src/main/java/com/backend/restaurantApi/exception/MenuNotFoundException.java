package com.backend.restaurantApi.exception;

/**
 * The class handles the error that is thrown when the menu is not found.
 */
public class MenuNotFoundException extends RuntimeException{

    /**
     * the error constructor. 
     * 
     * @param message the error message
     */
    public MenuNotFoundException(String message) {
        super(message);
    }
}
