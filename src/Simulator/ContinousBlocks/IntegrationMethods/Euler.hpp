#ifndef __EULER_H__
#define __EULER_H__

#include "IntegrationMethod.hpp"

class Euler : public IntegrationMethod {
    public:
        float integrate();
};
#endif // __EULER_H__