package com.itsolutions.application.lead;

import com.itsolutions.domain.lead.model.Lead;
import com.itsolutions.domain.lead.model.LeadNote;
import com.itsolutions.domain.lead.model.LeadSource;
import com.itsolutions.domain.lead.model.LeadStatus;
import com.itsolutions.domain.lead.port.in.CreateLeadUseCase;
import com.itsolutions.domain.lead.port.in.GetLeadsUseCase;
import com.itsolutions.domain.lead.port.in.UpdateLeadUseCase;
import com.itsolutions.domain.lead.port.out.LeadRepository;
import com.itsolutions.infrastructure.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class LeadApplicationService implements
        CreateLeadUseCase,
        GetLeadsUseCase,
        UpdateLeadUseCase {

    private final LeadRepository leadRepository;

    @Override
    public CreateLeadResult execute(CreateLeadCommand command) {
        log.info("Creating new lead: {}", command.getEmail());

        // Check for existing lead with same email
        Optional<Lead> existing = leadRepository.findByEmail(command.getEmail());
        if (existing.isPresent()) {
            log.info("Lead already exists for email: {}", command.getEmail());
            return CreateLeadResult.builder()
                    .leadId(existing.get().getId())
                    .success(true)
                    .build();
        }

        // Create new lead based on source
        Lead lead;
        switch (command.getSource()) {
            case CHAT -> lead = Lead.createFromChat(
                    command.getName(),
                    command.getEmail(),
                    command.getPhone(),
                    command.getChatSessionId()
            );
            case CONTACT_FORM -> lead = Lead.createFromContact(
                    command.getName(),
                    command.getEmail(),
                    command.getPhone(),
                    command.getCompany(),
                    command.getContactRequestId()
            );
            case QUOTE_FORM -> lead = Lead.createFromQuote(
                    command.getName(),
                    command.getEmail(),
                    command.getPhone(),
                    command.getCompany(),
                    command.getQuoteRequestId(),
                    command.getEstimatedValue()
            );
            default -> lead = Lead.createManual(
                    command.getName(),
                    command.getEmail(),
                    command.getPhone(),
                    command.getCompany()
            );
        }

        Lead saved = leadRepository.save(lead);
        log.info("Lead created with ID: {}", saved.getId());

        return CreateLeadResult.builder()
                .leadId(saved.getId())
                .success(true)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public LeadListResult getLeads(LeadQuery query) {
        var leads = leadRepository.findAll(
                query.getStatus(),
                query.getSource(),
                query.getAssignedTo(),
                query.getSearch(),
                query.getPage(),
                query.getSize(),
                query.getSortBy(),
                query.getSortDirection()
        );

        long total = leadRepository.count(
                query.getStatus(),
                query.getSource(),
                query.getAssignedTo(),
                query.getSearch()
        );
        int totalPages = (int) Math.ceil((double) total / query.getSize());

        return LeadListResult.builder()
                .leads(leads)
                .totalElements((int) total)
                .totalPages(totalPages)
                .currentPage(query.getPage())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Lead> getLeadById(UUID id) {
        return leadRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Lead> getLeadByEmail(String email) {
        return leadRepository.findByEmail(email);
    }

    @Override
    public void updateInfo(UUID leadId, UpdateInfoCommand command) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found: " + leadId));

        lead.updateInfo(
                command.getName(),
                command.getEmail(),
                command.getPhone(),
                command.getCompany()
        );

        leadRepository.save(lead);
        log.info("Lead {} info updated", leadId);
    }

    @Override
    public void updateStatus(UUID leadId, LeadStatus status) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found: " + leadId));

        lead.updateStatus(status);
        leadRepository.save(lead);
        log.info("Lead {} status updated to: {}", leadId, status);
    }

    @Override
    public void assignTo(UUID leadId, UUID adminId) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found: " + leadId));

        lead.assignTo(adminId);
        leadRepository.save(lead);
        log.info("Lead {} assigned to: {}", leadId, adminId);
    }

    @Override
    public void addNote(UUID leadId, String content, UUID adminId) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found: " + leadId));

        LeadNote note = LeadNote.create(leadId, content, adminId);
        lead.addNote(note);
        leadRepository.save(lead);
        log.info("Note added to lead: {}", leadId);
    }

    @Override
    public void setEstimatedValue(UUID leadId, BigDecimal value, String currency) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found: " + leadId));

        lead.setEstimatedValue(value, currency);
        leadRepository.save(lead);
        log.info("Lead {} estimated value set to: {} {}", leadId, value, currency);
    }

    @Override
    public void setTags(UUID leadId, String tags) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found: " + leadId));

        lead.setTags(tags);
        leadRepository.save(lead);
        log.info("Lead {} tags set to: {}", leadId, tags);
    }
}
