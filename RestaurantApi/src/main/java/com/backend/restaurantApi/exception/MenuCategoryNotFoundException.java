package com.backend.restaurantApi.exception;

public class MenuCategoryNotFoundException extends RuntimeException{

    public MenuCategoryNotFoundException(String message) {
        super(message);
    }
}
