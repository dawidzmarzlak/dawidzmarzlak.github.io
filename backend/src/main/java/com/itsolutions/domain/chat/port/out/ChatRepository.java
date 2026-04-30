package com.itsolutions.domain.chat.port.out;

import com.itsolutions.domain.chat.model.ChatMessage;
import com.itsolutions.domain.chat.model.ChatSession;
import com.itsolutions.domain.chat.model.ChatSessionStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Outbound port for chat persistence.
 *
 * <p>Unlike the other aggregate ports (Lead, Quote, Contact), the chat aggregate
 * does NOT use parent-cascade for messages: {@link ChatSession} is saved on its
 * own, then individual {@link ChatMessage} instances are persisted via
 * {@link #saveMessage(ChatMessage)}. The domain's in-memory
 * {@link ChatSession#getMessages()} list is a transient cache used while the
 * service holds the aggregate; the database side of the relationship is owned
 * by the message rows' {@code session_id} FK.</p>
 *
 * <p>Eager loading of messages is opt-in via {@link #findByIdWithMessages(UUID)};
 * the plain {@link #findById(UUID)} returns a session whose messages list is
 * empty, avoiding the JOIN cost on hot paths.</p>
 */
public interface ChatRepository {

    ChatSession save(ChatSession session);

    Optional<ChatSession> findById(UUID id);

    Optional<ChatSession> findByIdWithMessages(UUID id);

    ChatMessage saveMessage(ChatMessage message);

    List<ChatSession> findAllSessions(ChatSessionStatus status,
                                      String search,
                                      int page,
                                      int size,
                                      String sortBy,
                                      String sortDirection);

    long countSessions(ChatSessionStatus status, String search);
}
