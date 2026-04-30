package com.itsolutions.adapter.out.persistence.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Spring Data repository for {@link ChatMessageJpaEntity}.
 *
 * <p>Used directly by {@link com.itsolutions.adapter.out.persistence.chat.ChatRepositoryAdapter#saveMessage}
 * because chat messages are persisted independently of their parent session
 * (no JPA cascade — see {@link ChatSessionJpaEntity#getMessages()}).</p>
 *
 * <p>{@link #findBySessionIdOrderByCreatedAtAsc(UUID)} is a sanity-check finder
 * for tests; production code uses
 * {@link ChatSessionJpaRepository#findByIdWithMessages(UUID)} which fetches the
 * session and its messages in a single round-trip.</p>
 */
@Repository
public interface ChatMessageJpaRepository extends JpaRepository<ChatMessageJpaEntity, UUID> {

    List<ChatMessageJpaEntity> findBySessionIdOrderByCreatedAtAsc(UUID sessionId);
}
