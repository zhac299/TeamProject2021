package com.backend.restaurantApi.exception;

/**
 * The class handles the error that is thrown when a table is not found.
 */
public class TableNotFoundException extends RuntimeException{
    
    /**
     * The error constructor.
     * 
     * @param message the error message
     */
    public TableNotFoundException(String message) {
        super(message);
    }
}
