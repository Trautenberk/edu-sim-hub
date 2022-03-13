#ifndef CALENDAR_H
#define CALENDAR_H

#include "Event.hpp"
#include <deque>
#include <memory>

using namespace std;

class Calendar {

    public:
        shared_ptr<Event> getNextEvent();
        void insertEvent(shared_ptr<Event> event);
        bool cancelEvent(int eventId);
        bool isEmpty();
    private:
        deque<shared_ptr<Event>> _eventQueue = deque<shared_ptr<Event>>();
};

#endif