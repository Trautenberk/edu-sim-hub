#include "Event.hpp"

Event::Event(float _time, function<void(void)> _func) : time(_time), func(_func) 
{
    this->id = Event::_cnt++;
}

int Event::_cnt = 0;