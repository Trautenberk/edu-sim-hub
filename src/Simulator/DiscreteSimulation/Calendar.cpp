#include "Calendar.hpp"

bool Calendar::isEmpty()
{
    return this->_eventQueue.empty();
}

// Vloží event do kalendáře
void Calendar::insertEvent(Event event)
{
    for (int i = 0; i < this->_eventQueue.size(); i++)
    {
        auto& calEvent = this->_eventQueue.at(i);
        if(calEvent.time > event.time || (calEvent.time == event.time && calEvent.priority < event.priority)) {
            this->_eventQueue.insert(this->_eventQueue.begin() + i, event);
            return;
        }
    }
    this->_eventQueue.push_back(event);
}

// Vrací následující event
Event Calendar::getNextEvent()
{
    auto& event = this->_eventQueue.front();
    this->_eventQueue.pop_front();
    return event;
}

// Zruší event s daným id
bool Calendar::cancelEvent(int id)
{
    deque<Event>::iterator iter;

    for (iter = this->_eventQueue.begin(); iter != this->_eventQueue.end(); iter++)
    {
        if (iter->id == id)
        {
            this->_eventQueue.erase(iter);
            return true;
        }
    }
    return false;
}

// Vymaže kalendář
void Calendar::clear()
{
    this->_eventQueue.clear();
}