package com.backend.restaurantApi;

import com.backend.restaurantApi.model.Customer;
import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.model.RestaurantTable;
import com.backend.restaurantApi.service.CustomerService;
import com.backend.restaurantApi.service.OrderService;
import com.backend.restaurantApi.service.RestaurantTableService;
import org.checkerframework.checker.units.qual.C;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RestaurantApiApplicationTests {

	@Autowired
	OrderService orderService;

	@Autowired
	RestaurantTableService tableService;

	@Autowired
	CustomerService customerService;


	@Test
	void testCreateTable(){
		RestaurantTable t = tableService.createNewRestaurantTable(new RestaurantTable());
		Assertions.assertNotNull(tableService.getTableByNumber(t.getTableNumber()));
	}

	@Test
	void testCreateCustomer(){
		// Customer needs table to be created
		RestaurantTable t = tableService.createNewRestaurantTable(new RestaurantTable());
		Assertions.assertNotNull(tableService.getTableByNumber(t.getTableNumber()));
		Customer newCustomer = new Customer();
		newCustomer.setTable(t);
		newCustomer = customerService.createNewCustomer(newCustomer);
		Assertions.assertNotNull(customerService.getCustomerById(newCustomer.getId()));
	}

	@Test
	void createOrderWithCustomer(){
		// Customer needs table to be created
		RestaurantTable t = tableService.createNewRestaurantTable(new RestaurantTable());
		Assertions.assertNotNull(tableService.getTableByNumber(t.getTableNumber()));
		Customer newCustomer = new Customer();
		newCustomer.setTable(t);
		newCustomer = customerService.createNewCustomer(newCustomer);
		Assertions.assertNotNull(customerService.getCustomerById(newCustomer.getId()));

		Order order = new Order();
		order.setCustomer(newCustomer);
		order = orderService.createNewOrder(order);
		Assertions.assertNotNull(order);
	}

}
