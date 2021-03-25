package com.backend.restaurantApi;

import com.backend.restaurantApi.model.Customer;
import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.model.RestaurantTable;
import com.backend.restaurantApi.service.CustomerService;
import com.backend.restaurantApi.service.OrderService;
import com.backend.restaurantApi.service.RestaurantTableService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * A tester class for the Restaurant Api Application.
 */
@SpringBootTest
class RestaurantApiApplicationTests {

	/**
	 * A service that is used to make requests to the Order DB.
	 */
	@Autowired
	OrderService orderService;

	/**
	 * A service that is used to make requests to the Table DB.
	 */
	@Autowired
	RestaurantTableService tableService;

	/**
	 * A service that is used to make requests to the Customer DB.
	 */
	@Autowired
	CustomerService customerService;

	/**
	 * Test1.
	 * Checking if a new table can be created.
	 */
	@Test
	void testCreateTable(){
		RestaurantTable t = tableService.createNewRestaurantTable(new RestaurantTable());
		Assertions.assertNotNull(tableService.getTableByNumber(t.getTableNumber()));
	}

	/**
	 * Test2.
	 * Checking if a new customer can be created.
	 */
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

	/**
	 * Test2.
	 * Checking if a new order can be created using the customer.
	 */
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
