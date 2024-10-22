package com.example.ApprovalService.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ApprovalService.models.LoanTransaction;

@Repository
public interface ApprovalRepository extends JpaRepository<LoanTransaction, Long> {
	Optional<LoanTransaction> findByCustomerId(Long customerId);

	Optional<LoanTransaction> findById(Long loanId);
}
