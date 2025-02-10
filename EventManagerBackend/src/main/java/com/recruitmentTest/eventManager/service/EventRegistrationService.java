package com.recruitmentTest.eventManager.service;

import com.recruitmentTest.eventManager.model.EventRegistration;
import com.recruitmentTest.eventManager.repository.EventRegistrationRepository;
import com.recruitmentTest.eventManager.repository.EventRepository;
import com.recruitmentTest.eventManager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventRegistrationService {

    @Autowired
    private EventRegistrationRepository eventRegistrationRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public EventRegistration registerUserForEvent(Long userId, Long eventId) {
        // Vérifier si l'utilisateur est déjà inscrit
        Optional<EventRegistration> existingRegistration =
                eventRegistrationRepository.findByUserIdAndEventId(userId, eventId);

        if (existingRegistration.isPresent()) {
            throw new RuntimeException("Utilisateur déjà inscrit !");
        }

        // Créer une nouvelle inscription
        EventRegistration registration = new EventRegistration();
        registration.setUser(
                userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé !"))
        );
        registration.setEvent(
                eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Événement non trouvé !"))
        );

        return eventRegistrationRepository.save(registration);
    }

    public List<EventRegistration> getUserRegistrations(Long userId) {
        return eventRegistrationRepository.findByUserId(userId);
    }

    public void unregisterUserFromEvent(Long userId, Long eventId) {
        eventRegistrationRepository.deleteByUserIdAndEventId(userId, eventId);
    }
}
