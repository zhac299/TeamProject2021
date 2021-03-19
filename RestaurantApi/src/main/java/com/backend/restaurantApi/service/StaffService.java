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

@Service
public class StaffService {
    
    @Autowired
    StaffRepository staffRepository;
    
    @Autowired
    OrderRepository orderRepository;

    public Staff createNewStaff(Staff Staff) {
        return staffRepository.save(Staff);
    }

	public Staff getStaffById(Long StaffId) {
		Optional<Staff> optionalStaff = staffRepository.findById(StaffId);

        if (!optionalStaff.isPresent()) {
            throw new StaffNotFoundException("Staff Record is not available...");
        }
        return optionalStaff.get();
	}

	public List<Order> getSales(Long StaffId) {
		return orderRepository.findByWaiterIdAndIsPaid(StaffId, true);
	}

	public Staff updateStaff(Long id, Staff Staff) {
		Staff.setId(id);
        return staffRepository.save(Staff);
	}

	public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
	}

    public List<Staff> getStaffMember(String userName, String password){
        List<Staff> staff = staffRepository.getStaffMember(userName, password);
        return staff;
    }    
}