#ifndef __INTEGRATOR_H__
#define __INTEGRATOR_H__

#include "ContBlock.hpp"
#include <memory>
#include "ContBlockStatistics.hpp"


/**
 * @brief Blok integrátoru
 * 
 */
class Integrator : public ContBlockSingle {
    public:
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         * @param initialValue Počáteční hodnota/výchozí podmínka 
         */
        Integrator(objectId id, ContBlockEngineObj engine, double initialValue);
        static ContBlockSingleObj New(ContBlockEngineObj engine, double initialValue);
        static ContBlockSingleObj New(ContBlockEngineObj engine, double initialValue, ContBlockObj input);
        
        string objTypeName();
        IntegratorRecord getStatisticsRecord();

        void eval();
        double value();

        /**
         * @brief Provede krok numerické metody
         * 
         */
        void integrate();
    private:
        // Hodnota bloku v současném kroku
        double _currentState;
        // Hodnota bloku v předchozím kroku
        double _prevState; 
        // Slouží pro načtení vstupní hodnoty
        double _currentInputValue;
        // Počáteční hodnota        
        double _initialValue;


        // TODO
};
#endif // __INTEGRATOR_H__