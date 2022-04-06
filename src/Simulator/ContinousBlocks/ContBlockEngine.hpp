#ifndef __CONTBLOCKENGINE_H__
#define __CONTBLOCKENGINE_H__

#include "../ContinousSimulation/ContinousSimEngine.hpp"
#include "./IntegrationMethods/IntegrationMethod.hpp"

class ContBlockEngine : public ContinousSimEngine {
    public:
        ContBlockEngine(IntegrationMethod &integrationMethod);
        IntegrationMethod  &integrationMethod;
};

#endif // __CONTBLOCKENGINE_H__