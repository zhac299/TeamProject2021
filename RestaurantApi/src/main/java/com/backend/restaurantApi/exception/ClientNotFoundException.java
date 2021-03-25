package com.backend.restaurantApi.exception;

/**
 * The class handles the error that is thrown when a client member is not found.
 */
public class ClientNotFoundException extends RuntimeException{

    /**
     * The error constructor.
     * 
     * @param message the error message
     */
    public ClientNotFoundException(String message) {
        super(message);
    }
}
