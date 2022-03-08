#include "Calendar.hpp"



bool Calendar::isEmpty()
{
    return this->eventQueue.empty();
}

void Calendar::insertEvent(Event& event)
{
    for (int i = 0; i < this->eventQueue.size(); i++)
    {
        auto& calEvent = this->eventQueue.at(i);
        if(calEvent.time > event.time) {
            this->eventQueue.insert(this->eventQueue.begin() + i, event);
            return;
        }
    }
    this->eventQueue.push_back(event);
}

Event& Calendar::getNextEvent()
{
    auto& event = this->eventQueue.front();
    this->eventQueue.pop_front();
    return event;
}