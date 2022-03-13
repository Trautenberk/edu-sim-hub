#ifndef EVENT_H
#define EVENT_H

#include <functional>

using namespace std;

class Event {
    public:
        int id;
        int priority = 0;
        float time;
        function<void(void)> func;
        Event(float _time, function<void(void)> _func, int priority = 0);
        void Cancel();
    private:
        static int _cnt;
        bool _canceled = false;
};

#endif