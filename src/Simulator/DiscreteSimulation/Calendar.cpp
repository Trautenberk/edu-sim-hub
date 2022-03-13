#include "Calendar.hpp"



bool Calendar::isEmpty()
{
    return this->_eventQueue.empty();
}

void Calendar::insertEvent(shared_ptr<Event> event)
{
    for (int i = 0; i < this->_eventQueue.size(); i++)
    {
        auto& calEvent = this->_eventQueue.at(i);
        if(calEvent->time > event->time) {
            this->_eventQueue.insert(this->_eventQueue.begin() + i, event);
            return;
        }
    }
    this->_eventQueue.push_back(event);
}

shared_ptr<Event> Calendar::getNextEvent()
{
    auto& event = this->_eventQueue.front();
    this->_eventQueue.pop_front();
    return event;
}

bool Calendar::cancelEvent(int id)
{
    deque<shared_ptr<Event>>::iterator iter;

    for (iter = this->_eventQueue.begin(); iter != this->_eventQueue.end(); iter++)
    {
        if (iter->get()->id == id)
        {
            this->_eventQueue.erase(iter);
            return true;
        }
    }
    return false;
}