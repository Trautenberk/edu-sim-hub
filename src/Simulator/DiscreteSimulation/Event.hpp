#ifndef EVENT_H
#define EVENT_H

#include <functional>

using namespace std;

class Event {
    public:
        int id;
        int priority = 0;
        double time;
        function<void(int eventId)> func;
        Event(double _time, function<void(int eventId)> _func, int priority = 0);
        void Cancel();
    private:
        static int _cnt;
        bool _canceled = false;
};

#endif