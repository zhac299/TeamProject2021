package com.backend.restaurantApi.exception;

/**
 * The class handles the error that is thrown when an order is not found.
 */
public class OrderNotFoundException extends RuntimeException {
    
    /**
     * The error constructor.
     * 
     * @param message the error message
     */
    public OrderNotFoundException(String message) {
        super(message);
    }
}
