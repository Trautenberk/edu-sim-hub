#ifndef __DISCRETESIMOBJECT_H__
#define __DISCRETESIMOBJECT_H__

#include "../SimObject.hpp"

class DiscreteSimObject : public SimObject {
    public:
        virtual void initialize() = 0;
};

#endif // __DISCRETESIMOBJECT_H__