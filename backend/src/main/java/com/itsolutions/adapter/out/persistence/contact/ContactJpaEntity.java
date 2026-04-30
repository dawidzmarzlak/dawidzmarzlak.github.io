package com.itsolutions.adapter.out.persistence.contact;

import com.itsolutions.domain.contact.model.ContactStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

/**
 * JPA entity mapped to the {@code contact_requests} table.
 */
@Entity
@Table(name = "contact_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactJpaEntity {

    @Id
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;
    private String company;
    private String subject;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ContactStatus status;

    @Column(nullable = false, length = 5)
    private String locale;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    @Column(name = "quote_total")
    private BigDecimal quoteTotal;

    @Column(name = "quote_payload", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private String quotePayload;

    @Column(name = "reply_message", columnDefinition = "TEXT")
    private String replyMessage;

    @Column(name = "replied_by")
    private UUID repliedBy;

    @Column(name = "replied_at")
    private Instant repliedAt;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;
}
