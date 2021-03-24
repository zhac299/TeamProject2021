package com.backend.restaurantApi.exception;

/**
 * The class handles the error that is thrown when a staff member is not found.
 */
public class StaffNotFoundException extends RuntimeException {
    
    /**
     * The error constructor. 
     * 
     * @param message the error message
     */
    public StaffNotFoundException(String message) {
        super(message);
    }
}
