package com.backend.restaurantApi;
import com.backend.restaurantApi.exception.CustomerNotFoundException;
import com.backend.restaurantApi.exception.RestaurantTableNotFoundException;
import com.backend.restaurantApi.model.Customer;
import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.model.RestaurantTable;
import com.backend.restaurantApi.service.CustomerService;
import com.backend.restaurantApi.service.OrderService;
import com.backend.restaurantApi.service.RestaurantTableService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TableTests {
    
    /**
     * Tester field that is used to create a new RestaurantTable instance.
     */
    private RestaurantTable table;

    /**
     * Tester field that is used to create a new Customer instance.
     */
    private Customer customer;

    /**
     * The service used to make requests to the table DB.
     */
    @Autowired
    private RestaurantTableService tableService;

    /**
     * The service that is used to make requests to the customer DB.
     */
    @Autowired
    private CustomerService customerService;

    /**
     * Set up test that is run before each test.
     */
    @BeforeEach
    void setUp() {
        table = new RestaurantTable();
        table = tableService.createNewRestaurantTable(table);

        customer = new Customer();
        customer.setTable(table);
        customer = customerService.createNewCustomer(customer);
    }

    /**
     * Test 1.
     * Test if dropping a table will also drop a customer.
     * 
     * @throws CustomerNotFoundException if the customer is not found in the DB
     */
    @Test
    void dropTableCheckCustomer() {
        tableService.deleteRestaurantTable((long) 1);
        Assertions.assertThrows(CustomerNotFoundException.class, () -> {
            customerService.getCustomerById(customer.getId());
        }, "Should throw an exception since the customer is no longer in the DB.");
    }

    /**
     * Test 2.
     * Test if droping the customer will not drop the table.
     * 
     */
    @Test
    void dropCustomerCheckTable() {
        customerService.deleteCustomer((long) 2);

        Assertions.assertThrows(CustomerNotFoundException.class, () -> {
            customerService.getCustomerById(customer.getId());
        }, "Should throw an exception since the customer is no longer in the DB.");

        Assertions.assertThrows(RestaurantTableNotFoundException.class, () -> {
            tableService.getTableByNumber(table.getTableNumber());
        },"Should not throw an exception, deleting the customer should not delete the table.");
    }
}
