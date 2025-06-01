package com.employee.app.service;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.app.model.EmployeeHistory;
import com.employee.app.repository.EmployeeHistoryRepository;

@Service
public class EmployeeHistoryService {

    private final EmployeeHistoryRepository historyRepository;

    @Autowired
    public EmployeeHistoryService(EmployeeHistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    // Fetch all history entries for a given employee ID, ordered by timestamp descending
    public List<EmployeeHistory> getHistoryForEmployee(Long employeeId) {
        if (employeeId == null) {
            throw new IllegalArgumentException("Employee ID cannot be null.");
        }
        return historyRepository.findByEmployeeIdOrderByTimestampDesc(employeeId);
    }

    // Add a new history record for an employee with current timestamp
    public EmployeeHistory addHistory(Long employeeId, String action, String details) {
        EmployeeHistory history = new EmployeeHistory(employeeId, action, details, LocalDateTime.now());
        return historyRepository.save(history);
    }
}
