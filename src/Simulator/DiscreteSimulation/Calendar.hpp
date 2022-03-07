#include "Event.hpp"
#include <deque>

using namespace std;

class Calendar {

    public:
        Event& getNextEvent();
        void insertEvent(Event& event);
        bool isEmpty();
        Calendar(deque<Event>& _events);
        ~Calendar();
    private:
        deque<Event> eventQueue = deque<Event>();
};