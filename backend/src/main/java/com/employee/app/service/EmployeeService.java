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
import com.employee.app.model.EmployeeHistory;
import com.employee.app.repository.EmployeeRepository;
import com.employee.app.repository.EmployeeSpecification;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    @Autowired
    private EmployeeHistoryService historyService;

    // Create a new employee
    public Employee addEmployee(Employee employee) {
        String generatedEmployeeId = generateEmployeeId();
        employee.setEmployeeId(generatedEmployeeId);

        String generatedLoginId = generateLoginId(employee.getFirstName(), employee.getLastName());
        employee.setLoginId(generatedLoginId);

        Employee savedEmp = repository.save(employee);
        System.out.println("Saved employee: " + savedEmp.getId());

        historyService.addHistory(savedEmp.getId(), "Employee Created", "New employee record created.");
        return savedEmp;
    }

    // Get employee by ID
    public Employee getEmployeeById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new EmployeeNotFoundException("Employee with ID " + id + " not found"));
    }

    // Update employee and track important changes
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee existing = getEmployeeById(id);

        Double oldSalary = existing.getSalary();
        String oldDepartment = existing.getDepartment();

        existing.setFirstName(updatedEmployee.getFirstName());
        existing.setMiddleName(updatedEmployee.getMiddleName());
        existing.setLastName(updatedEmployee.getLastName());
        existing.setDateOfBirth(updatedEmployee.getDateOfBirth());
        existing.setDepartment(updatedEmployee.getDepartment());
        existing.setSalary(updatedEmployee.getSalary());
        existing.setPermanentAddress(updatedEmployee.getPermanentAddress());
        existing.setCurrentAddress(updatedEmployee.getCurrentAddress());

        Employee saved = repository.save(existing);

        if (!oldSalary.equals(updatedEmployee.getSalary())) {
            historyService.addHistory(id, "Salary Updated",
                "Salary changed from " + oldSalary + " to " + updatedEmployee.getSalary());
        }

        if (!oldDepartment.equals(updatedEmployee.getDepartment())) {
            historyService.addHistory(id, "Department Changed",
                "Department changed from " + oldDepartment + " to " + updatedEmployee.getDepartment());
        }

        return saved;
    }

    // Save employee without tracking
    public Employee saveEmployee(Employee emp) {
        return repository.save(emp);
    }

    // Search employees with criteria
    public Page<Employee> searchEmployees(EmployeeSearchCriteria criteria, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(EmployeeSpecification.filterBy(criteria), pageable);
    }

    // Delete single employee
    public void deleteEmployee(Long id) {
        repository.deleteById(id);
        historyService.addHistory(id, "Employee Deleted", "Employee record was deleted.");
    }

    // Delete multiple employees
    public void deleteMultipleEmployees(List<Long> ids) {
        repository.deleteAllById(ids);
        ids.forEach(id -> historyService.addHistory(id, "Employee Deleted", "Employee record was deleted."));
    }

    // Get employee history
    public List<EmployeeHistory> getHistoryByEmployeeId(Long employeeId) {
        return historyService.getHistoryForEmployee(employeeId);
    }

    // -------- Utility methods -------- //

    private String generateEmployeeId() {
        long count = repository.count() + 1;
        return String.format("EMP%03d", count);
    }

    private String generateLoginId(String firstName, String lastName) {
        String base = firstName.toLowerCase().charAt(0) + lastName.toLowerCase();
        String loginId = base;

        Random rand = new Random();
        while (repository.findByLoginId(loginId).isPresent()) {
            loginId = base + rand.nextInt(1000);
        }

        return loginId;
    }
}
