#ifndef __INTEGRATIONMETHOD_H__
#define __INTEGRATIONMETHOD_H__

class Integrator;

/**
 * @brief Třída pro numerické metody
 * 
 */
class IntegrationMethods {
    public:
        /**
         * @brief Eulerova metoda
         * 
         * @param currentState 
         * @param derivation 
         * @param step 
         * @return double 
         */
        static double Euler(double currentState, double derivation, double step);
};

#endif // __INTEGRATIONMETHOD_H__