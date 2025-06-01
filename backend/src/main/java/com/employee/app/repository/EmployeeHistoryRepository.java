package com.employee.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.employee.app.model.EmployeeHistory;

public interface EmployeeHistoryRepository extends JpaRepository<EmployeeHistory, Long> {

    @Query("SELECT h FROM EmployeeHistory h WHERE h.employeeId = :employeeId ORDER BY h.timestamp DESC")
    List<EmployeeHistory> findByEmployeeIdOrderByTimestampDesc(@Param("employeeId") Long employeeId);
}
