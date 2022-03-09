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
        virtual string getObjType();
        virtual void initialize();
};


// EMSCRIPTEN_BINDINGS(SimObject) {
//     class<SimObject>("SimObject")
//     .constructor<>()
//     .property("id", &SimObject::id)
//     .function("getObjType");
// }

#endif