package com.employee.app.model;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String employeeId; // Auto-generated: EMP001

    @NotBlank
    @Column(nullable = false)
    private String firstName;

    private String middleName;

    @NotBlank
    @Column(nullable = false)
    private String lastName;

    @Column(unique = true)
    private String loginId; // Auto-generated

    @Past
    @DateTimeFormat(pattern = "dd-MMM-yyyy")
    private LocalDate dateOfBirth;

    private String department;

    @DecimalMin(value = "0.0", inclusive = false)
    private Double salary;

    private String permanentAddress;
    private String currentAddress;

    private String idProofFileName; // Store file name/path
}
