#ifndef CALENDAR_H
#define CALENDAR_H

#include "Event.hpp"
#include <deque>
#include <memory>

using namespace std;

class Calendar {

    public:
        Event getNextEvent();
        void insertEvent(Event event);
        bool cancelEvent(int eventId);
        bool isEmpty();
    private:
        deque<Event> _eventQueue = {};
};

#endif