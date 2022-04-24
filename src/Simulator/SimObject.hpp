#ifndef SIMOBJECT_H
#define SIMOBJECT_H

#include <string>
#include "DiscreteSimulation/Calendar.hpp"

using objectId = std::string;

 class SimObject {

    private:
        static int _objCounter;
    public:
        static string createId(string objectType); 
        const objectId id();
        virtual string objTypeName() = 0;
        SimObject(objectId id);
    private:
        objectId _id;
};


// EMSCRIPTEN_BINDINGS(SimObject) {
//     class<SimObject>("SimObject")
//     .constructor<>()
//     .property("id", &SimObject::id)
//     .function("getObjType");
// }

#endif