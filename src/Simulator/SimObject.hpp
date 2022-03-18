#ifndef SIMOBJECT_H
#define SIMOBJECT_H

#include <string>
#include "DiscreteSimulation/Calendar.hpp"

using namespace std;

 class SimObject {

    private:
        static int _objCounter;
    public: 
        string id;
        SimObject();
        virtual string getObjType() = 0;
        virtual void initialize() = 0;
};


// EMSCRIPTEN_BINDINGS(SimObject) {
//     class<SimObject>("SimObject")
//     .constructor<>()
//     .property("id", &SimObject::id)
//     .function("getObjType");
// }

#endif