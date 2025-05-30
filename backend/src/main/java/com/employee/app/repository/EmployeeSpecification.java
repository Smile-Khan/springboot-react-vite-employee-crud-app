package com.employee.app.repository;

import com.employee.app.model.Employee;
import com.employee.app.dto.EmployeeSearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class EmployeeSpecification {

    public static Specification<Employee> filterBy(EmployeeSearchCriteria criteria) {
        return (root, query, cb) -> {
            var predicates = cb.conjunction();

            if (criteria.getEmployeeId() != null) {
                predicates.getExpressions().add(cb.equal(root.get("employeeId"), criteria.getEmployeeId()));
            }

            if (criteria.getFirstName() != null) {
                predicates.getExpressions().add(cb.like(cb.lower(root.get("firstName")), "%" + criteria.getFirstName().toLowerCase() + "%"));
            }

            if (criteria.getLastName() != null) {
                predicates.getExpressions().add(cb.like(cb.lower(root.get("lastName")), "%" + criteria.getLastName().toLowerCase() + "%"));
            }

            if (criteria.getLoginId() != null) {
                predicates.getExpressions().add(cb.equal(root.get("loginId"), criteria.getLoginId()));
            }

            if (criteria.getDepartment() != null) {
                predicates.getExpressions().add(cb.equal(root.get("department"), criteria.getDepartment()));
            }

            if (criteria.getDobFrom() != null) {
                predicates.getExpressions().add(cb.greaterThanOrEqualTo(root.get("dateOfBirth"), criteria.getDobFrom()));
            }

            if (criteria.getDobTo() != null) {
                predicates.getExpressions().add(cb.lessThanOrEqualTo(root.get("dateOfBirth"), criteria.getDobTo()));
            }

            return predicates;
        };
    }
}
