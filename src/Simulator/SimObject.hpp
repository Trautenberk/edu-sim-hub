#ifndef SIMOBJECT_H
#define SIMOBJECT_H

#include <string>
#include "SimEngine.hpp"


using objectId = std::string;

class SimEngine;
 class SimObject {

    private:
        static int _objCounter;
    public:
        SimObject(objectId id);
        static std::string createId(std::string objectType); 
        const objectId id();
        virtual std::string objTypeName() = 0;
        virtual void initialize() = 0;
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