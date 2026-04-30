package com.itsolutions.adapter.out.persistence.quote;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * JPA entity mapped to the {@code quote_attachments} child table.
 *
 * <p>The parent-child relationship is owned by {@link QuoteJpaEntity} via a unidirectional
 * {@code @OneToMany} with {@code @JoinColumn(name = "quote_id")}; this entity therefore has
 * no inverse {@code quote} reference — Hibernate fills the {@code quote_id} FK from the
 * parent's collection.</p>
 */
@Entity
@Table(name = "quote_attachments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuoteAttachmentJpaEntity {

    @Id
    private UUID id;

    @Column(name = "file_name", nullable = false, length = 255)
    private String fileName;

    @Column(name = "content_type", length = 100)
    private String contentType;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "storage_path", nullable = false, columnDefinition = "TEXT")
    private String storagePath;

    @Column(name = "uploaded_at")
    private Instant uploadedAt;
}
