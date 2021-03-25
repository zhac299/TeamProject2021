package com.backend.restaurantApi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.restaurantApi.exception.StaffNotFoundException;
import com.backend.restaurantApi.model.Order;
import com.backend.restaurantApi.model.Staff;
import com.backend.restaurantApi.repository.OrderRepository;
import com.backend.restaurantApi.repository.StaffRepository;

/**
 * The Service class of the Staff model that handles the CRUD API functionality on the model.
 */
@Service
public class StaffService {

    /**
     * The staff repository to be autowired.
     */
    @Autowired
    StaffRepository staffRepository;

    /**
     * The order repository to be autowired.
     */
    @Autowired
    OrderRepository orderRepository;
    /**
     * This method is tasked with creating a new staff member in the database.
     * 
     * @param Staff The staff object to be added to the database.
     * @return The state of the staff repository after adding the new staff member.
     */
    public Staff createNewStaff(Staff Staff) {
        return staffRepository.save(Staff);
    }
    /**
     * This method is tasked with getting a staff member by their ID.
     * 
     * @param StaffId The ID of the desired staff member.
     * @return The staff member associated with the given ID.
     */
	public Staff getStaffById(Long StaffId) {
		Optional<Staff> optionalStaff = staffRepository.findById(StaffId);

        if (!optionalStaff.isPresent()) {
            throw new StaffNotFoundException("Staff Record is not available...");
        }
        return optionalStaff.get();
	}
    /**
     * This method is tasked with getting the sales proccessed by a particular staff member.
     * 
     * @param StaffId The ID of the staff member in question.
     * @return The list of orders processed by the staff member identified with ID.
     */
	public List<Order> getSales(Long StaffId) {
		return orderRepository.findByWaiterIdAndIsPaid(StaffId, true);
	}
    /**
     * This method is tasked with updating staff details.
     * 
     * @param id The new ID given to the staff member.
     * @param Staff The staff member which credentials need updating.
     * @return The saved state of the repository after staff credentials have been updating.
     */
	public Staff updateStaff(Long id, Staff Staff) {
		Staff.setId(id);
        return staffRepository.save(Staff);
	}
    /**
     * This method is tasked with deleting a staff member by ID.
     * 
     * @param id The ID of the staff member to be deleted.
     */
	public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
	}
    /**
     * This method is tasked with getting a staff member from the database.
     * 
     * @param userName The username of the desired staff member.
     * @param password The password of the desired staff member.
     * @return The staff member derived fromthe given username and password.
     */
    public List<Staff> getStaffMember(String userName, String password){
        List<Staff> staff = staffRepository.getStaffMember(userName, password);
        return staff;
    }    
}