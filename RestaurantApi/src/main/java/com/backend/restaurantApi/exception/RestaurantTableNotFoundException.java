package com.backend.restaurantApi.exception;

/**
 * The class handles the error that is thrown when a table is not found.
 */
public class RestaurantTableNotFoundException extends RuntimeException{
    
    /**
     * The error constructor.
     * 
     * @param message the error message
     */
    public RestaurantTableNotFoundException(String message) {
        super(message);
    }
}
