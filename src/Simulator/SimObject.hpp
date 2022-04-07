#ifndef SIMOBJECT_H
#define SIMOBJECT_H

#include <string>
#include "DiscreteSimulation/Calendar.hpp"

using namespace std;

 class SimObject {

    private:
        static int _objCounter;
    public: 
        string name() {return objTypeName() + "_" + to_string(_id);}
        const int id() const {return _id;};
        virtual string objTypeName() = 0;
        virtual void gatherStatistics() = 0;
        SimObject();
    private:
        int _id = 0;
};


// EMSCRIPTEN_BINDINGS(SimObject) {
//     class<SimObject>("SimObject")
//     .constructor<>()
//     .property("id", &SimObject::id)
//     .function("getObjType");
// }

#endif