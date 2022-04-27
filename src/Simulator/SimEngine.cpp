#include "SimEngine.hpp"
#include <memory>


double SimEngine::time()
{
    return this->_time;
}

double SimEngine::endTime()
{
    return this->_endTime;
}



class TestanA {
    public:
        TestanA() {};
};


#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(SimEngine) {
        emscripten::class_<TestanA>("TestanA")
        .constructor<>()
        ;
    }

#endif