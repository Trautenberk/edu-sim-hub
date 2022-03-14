#include "Event.hpp"

Event::Event(float _time, function<void(int eventId)> _func, int _priority) : time(_time), func(_func), priority(_priority) 
{
    this->id = Event::_cnt++;
}

int Event::_cnt = 0;