package com.employee.app.controller;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.employee.app.dto.EmployeeSearchCriteria;
import com.employee.app.model.Employee;
import com.employee.app.repository.EmployeeRepository;
import com.employee.app.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Value("${file.upload-dir}")
    private String uploadsDir;

    // ✅ Add new employee
    @PostMapping
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee saved = service.addEmployee(employee);
        return ResponseEntity.ok(saved);
    }

    // ✅ Upload ID proof
    @PostMapping("/upload-id/{id}")
    public ResponseEntity<String> uploadIdProof(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            Optional<Employee> employeeOpt = employeeRepository.findById(id);
            if (!employeeOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
            }

            File uploadsFolder = new File(uploadsDir);
            if (!uploadsFolder.exists()) {
                uploadsFolder.mkdirs();
            }

            String fileName = "ID_" + id + "_" + file.getOriginalFilename();
            String filePath = uploadsDir + File.separator + fileName;

            file.transferTo(new File(filePath));

            Employee employee = employeeOpt.get();
            employee.setIdProofFileName(fileName);
            employeeRepository.save(employee);

            return ResponseEntity.ok("PDF uploaded successfully!");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload failed: " + e.getMessage());
        }
    }

    // ✅ Search with filters and pagination
    @GetMapping("/search")
    public Page<Employee> searchEmployees(EmployeeSearchCriteria criteria,
                                          @RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "5") int size) {
        return service.searchEmployees(criteria, page, size);
    }

    // ✅ Delete employee
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        service.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }

    // ✅ Get employee by ID (for edit page)
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Update employee by ID
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        Optional<Employee> existingOpt = employeeRepository.findById(id);
        if (!existingOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Employee existing = existingOpt.get();

        existing.setFirstName(updatedEmployee.getFirstName());
        existing.setMiddleName(updatedEmployee.getMiddleName());
        existing.setLastName(updatedEmployee.getLastName());
        existing.setDateOfBirth(updatedEmployee.getDateOfBirth());
        existing.setDepartment(updatedEmployee.getDepartment());
        existing.setSalary(updatedEmployee.getSalary());
        existing.setPermanentAddress(updatedEmployee.getPermanentAddress());
        existing.setCurrentAddress(updatedEmployee.getCurrentAddress());

        employeeRepository.save(existing);

        return ResponseEntity.ok(existing);
    }
}
