package com.backend.restaurantApi.exception;

/**
 * The class handles the error that is thrown when a menu category is not found.
 */
public class MenuCategoryNotFoundException extends RuntimeException{

    /**
     * The error constructor. 
     * 
     * @param message the error message
     */
    public MenuCategoryNotFoundException(String message) {
        super(message);
    }
}
