package com.example.ApprovalService.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ApprovalService.models.Kyc;

@Repository
public interface KycRepository extends JpaRepository<Kyc, Integer> {
	Optional<Kyc> findByCustomerId(Long customerId);
}
