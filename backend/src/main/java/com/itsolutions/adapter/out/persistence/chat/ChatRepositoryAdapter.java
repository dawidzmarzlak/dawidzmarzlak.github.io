package com.itsolutions.adapter.out.persistence.chat;

import com.itsolutions.domain.chat.model.ChatMessage;
import com.itsolutions.domain.chat.model.ChatSession;
import com.itsolutions.domain.chat.model.ChatSessionStatus;
import com.itsolutions.domain.chat.port.out.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

/**
 * Outbound adapter implementing {@link ChatRepository} on top of Spring Data JPA.
 *
 * <p>Unlike the lead/quote adapters (which cascade child rows from the parent
 * save), chat messages are persisted independently via
 * {@link ChatMessageJpaRepository} — see {@link #saveMessage(ChatMessage)}.
 * The session entity's mirror collection is read-only (see {@link ChatMapper}).</p>
 */
@Component
@RequiredArgsConstructor
public class ChatRepositoryAdapter implements ChatRepository {

    private static final Set<String> ALLOWED_SORT = Set.of(
            "createdAt", "updatedAt", "status", "locale", "llmProvider"
    );

    private final ChatSessionJpaRepository sessionJpa;
    private final ChatMessageJpaRepository messageJpa;
    private final ChatMapper mapper;

    @Override
    public ChatSession save(ChatSession session) {
        return mapper.toDomain(sessionJpa.save(mapper.toEntity(session)));
    }

    @Override
    public Optional<ChatSession> findById(UUID id) {
        return sessionJpa.findById(id).map(mapper::toDomain);
    }

    @Override
    public Optional<ChatSession> findByIdWithMessages(UUID id) {
        return sessionJpa.findByIdWithMessages(id).map(mapper::toDomain);
    }

    @Override
    public ChatMessage saveMessage(ChatMessage message) {
        return mapper.toDomain(messageJpa.save(mapper.toEntity(message)));
    }

    @Override
    public List<ChatSession> findAllSessions(ChatSessionStatus status,
                                             String search,
                                             int page,
                                             int size,
                                             String sortBy,
                                             String sortDirection) {
        Sort.Direction dir = "asc".equalsIgnoreCase(sortDirection)
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;
        String prop = (sortBy != null && ALLOWED_SORT.contains(sortBy)) ? sortBy : "createdAt";
        return sessionJpa.search(status, search, PageRequest.of(page, size, Sort.by(dir, prop)))
                .map(mapper::toDomain)
                .getContent();
    }

    @Override
    public long countSessions(ChatSessionStatus status, String search) {
        return sessionJpa.countSearch(status, search);
    }
}
