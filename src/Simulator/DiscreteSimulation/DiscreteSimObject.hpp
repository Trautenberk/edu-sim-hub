#ifndef __DISCRETESIMOBJECT_H__
#define __DISCRETESIMOBJECT_H__

#include "../SimObject.hpp"

class DiscreteSimObject : public SimObject {
    public:
        DiscreteSimObject(objectId id) : SimObject(id) {};
        virtual void initialize() = 0;
};

#endif // __DISCRETESIMOBJECT_H__