package com.employee.app.service;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.employee.app.dto.EmployeeSearchCriteria;
import com.employee.app.exception.EmployeeNotFoundException;
import com.employee.app.model.Employee;
import com.employee.app.repository.EmployeeRepository;
import com.employee.app.repository.EmployeeSpecification;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    /**
     * Adds a new employee with generated employeeId and loginId.
     */
    public Employee addEmployee(Employee employee) {
        // Generate employee ID like EMP001
        String generatedEmployeeId = generateEmployeeId();
        employee.setEmployeeId(generatedEmployeeId);

        // Generate unique login ID like jdoe123
        String generatedLoginId = generateLoginId(employee.getFirstName(), employee.getLastName());
        employee.setLoginId(generatedLoginId);

        // Save employee
        Employee savedEmp = repository.save(employee);
        System.out.println("Saved employee: " + savedEmp.getId());
        return savedEmp;
    }

    /**
     * Retrieves an employee by ID or throws exception if not found.
     */
    public Employee getEmployeeById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new EmployeeNotFoundException("Employee with ID " + id + " not found"));
    }

    /**
     * Saves (or updates) an existing employee.
     */
    public Employee saveEmployee(Employee emp) {
        return repository.save(emp);
    }

    /**
     * Searches employees based on criteria with pagination.
     */
    public Page<Employee> searchEmployees(EmployeeSearchCriteria criteria, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(EmployeeSpecification.filterBy(criteria), pageable);
    }

    // ---------------- Private Utility Methods ---------------- //

    /**
     * Generates a formatted employee ID like EMP001.
     */
    private String generateEmployeeId() {
        int count = (int) (repository.count() + 1);
        return String.format("EMP%03d", count);
    }

    /**
     * Generates a unique login ID like jdoe123.
     */
    private String generateLoginId(String firstName, String lastName) {
        String base = firstName.toLowerCase().charAt(0) + lastName.toLowerCase();
        String loginId = base;

        Random rand = new Random();
        while (repository.findByLoginId(loginId).isPresent()) {
            loginId = base + rand.nextInt(1000);
        }

        return loginId;
    }

    public void deleteEmployee(Long id) {
    repository.deleteById(id);
}
public void deleteMultipleEmployees(List<Long> ids) {
    repository.deleteAllById(ids);
}
}
