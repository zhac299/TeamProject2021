package com.backend.restaurantApi.service;

import java.util.List;
import java.util.Optional;

import com.backend.restaurantApi.exception.StaffNotFoundException;
import com.backend.restaurantApi.model.Staff;
import com.backend.restaurantApi.repository.StaffRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffService {
    
    @Autowired
    StaffRepository staffRepository;

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

	public Staff updateStaff(Long id, Staff Staff) {
		Staff.setStaffId(id);
        return staffRepository.save(Staff);
	}

	public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
	}

    public List<Staff> getStaffMember(String userName, String password){
        List staff = staffRepository.getStaffMember(userName, password);
        return staff;
    }
    
}
