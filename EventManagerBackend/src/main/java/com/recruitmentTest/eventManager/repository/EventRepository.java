package com.recruitmentTest.eventManager.repository;

import com.recruitmentTest.eventManager.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCreatorId(Long creatorId);
}
