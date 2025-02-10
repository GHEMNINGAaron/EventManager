package com.recruitmentTest.eventManager.controller;

import com.recruitmentTest.eventManager.model.EventRegistration;
import com.recruitmentTest.eventManager.service.AuthUserService;
import com.recruitmentTest.eventManager.service.EventRegistrationService;
import com.recruitmentTest.eventManager.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/eventRegistration")
@CrossOrigin(origins = "*")
public class EventRegistrationController {

    @Autowired
    private EventRegistrationService eventRegistrationService;

    @Autowired
    private EventService eventService;

    @Autowired
    private AuthUserService authUserService;

    @PostMapping("/{eventId}")
    public ResponseEntity<?> registerForEvent(@PathVariable Long eventId, Authentication authentication) {
        Long userId = authUserService.getUserByEmail(authentication.getName()).getId();
        EventRegistration registration = eventRegistrationService.registerUserForEvent(userId, eventId);
        return ResponseEntity.ok(registration);
    }

    @GetMapping
    public ResponseEntity<List<EventRegistration>> getMyRegistrations(Authentication authentication) {
        Long userId = authUserService.getUserByEmail(authentication.getName()).getId();
        return ResponseEntity.ok(eventRegistrationService.getUserRegistrations(userId));
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> unregisterFromEvent(@PathVariable Long eventId, Authentication authentication) {
        Long userId = authUserService.getUserByEmail(authentication.getName()).getId();
        eventRegistrationService.unregisterUserFromEvent(userId, eventId);
        return ResponseEntity.ok().build();
    }
}
