#ifndef __CONTINOUSSIMOBJECT_H__
#define __CONTINOUSSIMOBJECT_H__

#include "../SimObject.hpp"

class ContinousSimObject : public SimObject 
{
    public:
        virtual void eval() = 0;
};

#endif // __CONTINOUSSIMOBJECT_H__