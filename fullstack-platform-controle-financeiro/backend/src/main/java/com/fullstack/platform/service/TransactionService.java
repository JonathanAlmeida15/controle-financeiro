package com.fullstack.platform.service;

import com.fullstack.platform.controller.dto.TransactionRequest;
import com.fullstack.platform.domain.Transaction;
import com.fullstack.platform.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository repository;

    public Transaction createFromRequest(
            TransactionRequest request,
            Long userId,
            Long accountId
    ) {

        // ✅ VALIDAÇÕES BÁSICAS
        if (request.getAmount() == null) {
            throw new RuntimeException("Valor da transação é obrigatório");
        }

        if (request.getType() == null || request.getType().isBlank()) {
            throw new RuntimeException("Tipo da transação é obrigatório");
        }

        Transaction t = new Transaction();
        t.setDescription(request.getDescription());
        t.setAmount(request.getAmount());
        t.setType(request.getType());
        t.setCategoryId(request.getCategoryId());

        // ✅ CORREÇÃO DEFINITIVA DO ERRO
        t.setOccurredAt(
                request.getOccurredAt() != null
                        ? request.getOccurredAt()
                        : LocalDate.now()
        );

        t.setUserId(userId);
        t.setAccountId(accountId);

        return repository.save(t);
    }

    public List<Transaction> findAll(Long userId) {
        return repository.findByUserId(userId);
    }

    public Transaction updateFromRequest(Long id, TransactionRequest request) {
        Transaction t = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada"));

        t.setDescription(request.getDescription());
        t.setAmount(request.getAmount());
        t.setType(request.getType());
        t.setCategoryId(request.getCategoryId());

        // ✅ MANTÉM DATA ANTIGA SE NÃO VIER NOVA
        if (request.getOccurredAt() != null) {
            t.setOccurredAt(request.getOccurredAt());
        }

        return repository.save(t);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
