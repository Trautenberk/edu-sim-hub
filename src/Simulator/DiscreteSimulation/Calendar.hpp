#ifndef CALENDAR_H
#define CALENDAR_H

#include "Event.hpp"
#include <deque>
#include <memory>

using namespace std;

/**
 * @brief Struktura kalendáře pro algoritmus Next-Event
 */
class Calendar {
    public:
        /**
         * @brief Vymaže obsah kalendáře
         */
        void clear();
        /**
         * @brief Vrací následující event
         * 
         * @return Event 
         */
        Event getNextEvent();
        /**
         * @brief Vloží event do kalendáře
         * 
         * @param event 
         */
        void insertEvent(Event event);
        /**
         * @brief Zruší event v kalendáři
         * 
         * @param eventId 
         * @return true 
         * @return false 
         */
        bool cancelEvent(int eventId);
        /**
         * @brief Vrací příznak, jestli je kalendář prázdný
         * 
         * @return true 
         * @return false 
         */
        bool isEmpty();
    private:
        // fronta událostí
        deque<Event> _eventQueue = {};
};

#endif