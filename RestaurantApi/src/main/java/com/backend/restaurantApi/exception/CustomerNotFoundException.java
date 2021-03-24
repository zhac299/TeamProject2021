package com.backend.restaurantApi.exception;

/**
 * The class handles the error that is thrown when a customer is not found.
 */
public class CustomerNotFoundException extends RuntimeException {
    
    /**
     * The error constructor.
     * 
     * @param message the error message
     */
    public CustomerNotFoundException(String message) {
        super(message);
    }
}
