# syntax=docker/dockerfile:1.7

# ---- Build stage ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace

# Copy poms first for dependency cache
COPY backend/pom.xml backend/pom.xml
# OpenAPI spec is referenced by the openapi-generator-maven-plugin from ../api/openapi.yaml
COPY api api

# Pre-fetch deps (skip the codegen phase here — it only kicks in during compile)
RUN cd backend && mvn -B -q dependency:go-offline -DskipTests -Dcodegen.skip=true || true

# Copy source and build
COPY backend/src backend/src
RUN cd backend && mvn -B -q -DskipTests package

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre-alpine AS runtime

RUN addgroup -S app && adduser -S app -G app && \
    apk add --no-cache wget

WORKDIR /app
COPY --from=build /workspace/backend/target/*.jar /app/app.jar

USER app
EXPOSE 8080

ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75 -XX:+UseContainerSupport -Djava.security.egd=file:/dev/./urandom"

HEALTHCHECK --interval=20s --timeout=3s --start-period=60s --retries=5 \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java","-jar","/app/app.jar"]
