package com.backend.restaurantApi.exception;

/**
 * The class handles the error that is thrown when a meal is not found.
 */
public class MealNotFoundException extends RuntimeException {
    
    /**
     * The error constructor.
     * 
     * @param message the error message
     */
    public MealNotFoundException(String message) {
        super(message);
    }
}
