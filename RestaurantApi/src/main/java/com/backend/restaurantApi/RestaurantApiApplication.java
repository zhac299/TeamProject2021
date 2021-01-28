package com.backend.restaurantApi;

import com.backend.restaurantApi.model.Allergy;
import com.backend.restaurantApi.model.DishAllergies;
import com.backend.restaurantApi.model.Drink;
import com.backend.restaurantApi.model.Main;
import com.backend.restaurantApi.repository.AllergyRepository;
import com.backend.restaurantApi.repository.DishAllergiesRepository;
import com.backend.restaurantApi.repository.DrinkRepository;
import com.backend.restaurantApi.repository.MainRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RestaurantApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestaurantApiApplication.class, args);
	}

	@Bean
    public CommandLineRunner mappingDemo(DishAllergiesRepository daRepository,
										 AllergyRepository allergyRepository,
										 MainRepository mainRepository) {
        return args -> {

            // create a new book
			DishAllergies da1 = new DishAllergies();
			
			Main milkDrink = new Main("mango laasi", 1.50, da1);

			Allergy dairyAllergy = new Allergy("milk", da1);
		

            // save the book
			daRepository.save(da1);
			mainRepository.save(milkDrink);
			allergyRepository.save(dairyAllergy);
		};
	}
}
