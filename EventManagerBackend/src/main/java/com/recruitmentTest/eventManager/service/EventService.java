package com.recruitmentTest.eventManager.service;

import com.recruitmentTest.eventManager.model.Event;
import com.recruitmentTest.eventManager.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsByCreator(Long creatorId) {
        return eventRepository.findByCreatorId(creatorId);
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        Optional<Event> eventOptional = eventRepository.findById(id);

        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            event.setTitle(updatedEvent.getTitle());
            event.setDescription(updatedEvent.getDescription());
            event.setDate(updatedEvent.getDate());
            event.setLocation(updatedEvent.getLocation());
            return eventRepository.save(event);
        } else {
            throw new RuntimeException("Événement non trouvé !");
        }
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
