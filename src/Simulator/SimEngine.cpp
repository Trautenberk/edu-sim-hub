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


#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(SimEngine) {
        emscripten::class_<SimEngine>("SimEngine")
        .function("simulate", &SimEngine::simulate);
    }
#endif