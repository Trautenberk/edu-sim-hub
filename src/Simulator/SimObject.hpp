#ifndef SIMOBJECT_H
#define SIMOBJECT_H

#include <string>
#include "DiscreteSimulation/Calendar.hpp"

using namespace std;
using objectId = int;


 class SimObject {

    private:
        static int _objCounter;
    public: 
        string name() {return objTypeName() + "_" + to_string(_id);}
        const objectId id() const {return _id;};
        virtual string objTypeName() = 0;
        SimObject();
    private:
        objectId _id = 0;
};


// EMSCRIPTEN_BINDINGS(SimObject) {
//     class<SimObject>("SimObject")
//     .constructor<>()
//     .property("id", &SimObject::id)
//     .function("getObjType");
// }

#endif