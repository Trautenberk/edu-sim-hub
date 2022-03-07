#include <functional>

using namespace std;

class Event {
    public:
        float time;
        function<void(void)> func;
        Event(float _time, function<void(void)> _func);
        ~Event();
};