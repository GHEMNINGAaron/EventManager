package com.recruitmentTest.eventManager.controller;

import com.recruitmentTest.eventManager.model.Event;
import com.recruitmentTest.eventManager.service.AuthUserService;
import com.recruitmentTest.eventManager.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private AuthUserService authUserService;

    @GetMapping("/creator")
    public ResponseEntity<?> getEventsByCreator(Authentication authentication) {
        return ResponseEntity.ok(
                eventService.getEventsByCreator(
                        authUserService.getUserByEmail(
                                authentication.getName()).getId())
        );
    }

    @PostMapping("/create")
    public ResponseEntity<?> createEvent(@RequestBody Event event, Authentication authentication) {
        event.setCreator(
                authUserService.getUserByEmail(authentication.getName())
        );
        Event createdEvent = eventService.createEvent(event);
        return ResponseEntity.ok(createdEvent);
    }


    @GetMapping("/one/{id}")
    public ResponseEntity<?> getEventById(@PathVariable Long id) {
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        return ResponseEntity.ok(eventService.updateEvent(id, updatedEvent));
    }

    @DeleteMapping("/edit/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok().build();
    }
}
