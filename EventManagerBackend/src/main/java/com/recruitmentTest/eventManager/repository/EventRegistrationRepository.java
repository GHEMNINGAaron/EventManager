package com.recruitmentTest.eventManager.repository;

import com.recruitmentTest.eventManager.model.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    Optional<EventRegistration> findByUserIdAndEventId(Long userId, Long eventId);

    List<EventRegistration> findByUserId(Long userId);

    void deleteByUserIdAndEventId(Long userId, Long eventId);
}
