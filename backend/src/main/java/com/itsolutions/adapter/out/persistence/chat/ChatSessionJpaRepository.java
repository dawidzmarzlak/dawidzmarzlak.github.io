package com.itsolutions.adapter.out.persistence.chat;

import com.itsolutions.domain.chat.model.ChatSessionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatSessionJpaRepository extends JpaRepository<ChatSessionJpaEntity, UUID> {

    /**
     * Eager-loads {@code messages} via an {@code @EntityGraph} fetch graph.
     * Used by {@link com.itsolutions.application.chat.ChatService#execute(UUID)}
     * to load a full conversation in a single query.
     */
    @EntityGraph(attributePaths = {"messages"})
    @Query("SELECT s FROM ChatSessionJpaEntity s WHERE s.id = :id")
    Optional<ChatSessionJpaEntity> findByIdWithMessages(@Param("id") UUID id);

    @Query("""
           SELECT s FROM ChatSessionJpaEntity s
           WHERE (:status IS NULL OR s.status = :status)
             AND (:search IS NULL OR :search = ''
                  OR LOWER(s.visitorId)   LIKE LOWER(CONCAT('%', :search, '%'))
                  OR LOWER(s.llmProvider) LIKE LOWER(CONCAT('%', :search, '%')))
           """)
    Page<ChatSessionJpaEntity> search(@Param("status") ChatSessionStatus status,
                                      @Param("search") String search,
                                      Pageable pageable);

    @Query("""
           SELECT COUNT(s) FROM ChatSessionJpaEntity s
           WHERE (:status IS NULL OR s.status = :status)
             AND (:search IS NULL OR :search = ''
                  OR LOWER(s.visitorId)   LIKE LOWER(CONCAT('%', :search, '%'))
                  OR LOWER(s.llmProvider) LIKE LOWER(CONCAT('%', :search, '%')))
           """)
    long countSearch(@Param("status") ChatSessionStatus status,
                     @Param("search") String search);
}
