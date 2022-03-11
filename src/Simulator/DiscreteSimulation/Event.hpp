#ifndef EVENT_H
#define EVENT_H

#include <functional>

using namespace std;

class Event {
    public:
        int id;
        float time;
        function<void(void)> func;
        Event(float _time, function<void(void)> _func);
        void Cancel();
    private:
        static int _cnt;
        bool _canceled = false;
};

#endif