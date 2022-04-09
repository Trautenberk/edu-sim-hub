#ifndef __INTEGRATIONMETHOD_H__
#define __INTEGRATIONMETHOD_H__

class Integrator;

class IntegrationMethods {
    public:
        static double Euler(double currentState, double derivation, double step);
};

#endif // __INTEGRATIONMETHOD_H__