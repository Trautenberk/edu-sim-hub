#ifndef __CONTBLOCKENGINE_H__
#define __CONTBLOCKENGINE_H__

#include "../ContinousSimulation/ContinousSimEngine.hpp"
#include "../IntegrationMethods/IntegrationMethods.hpp"
#include "ContBlockStatistics.hpp"
#include <memory>
#include <vector>

class Integrator;
class ContBlockEngine;


#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

using ContBlockEngineObj = shared_ptr<ContBlockEngine>;

/**
 * @brief Simulační engine spojitých blokových schémat
 * 
 */
class ContBlockEngine : public ContinousSimEngine {
    public:
        /**
         * @brief Bezparametrický konstruktor
         * 
         */
        ContBlockEngine();
        /**
         * @brief Konstruktor s možností předání numerické metody
         * 
         * @param integrationMethod 
         */
        ContBlockEngine(function<double(double currentState, double derivation, double step)> integrationMethod);
        /**
         * @brief Pomocná funkce pro konstrukci v testech
         * 
         * @param integrationMethod 
         * @return ContBlockEngineObj 
         */
        static ContBlockEngineObj New(function<double(double currentState, double derivation, double step)> integrationMethod);
        /**
         * @brief Přidá ukazatel na Integrátor do kolekce
         * 
         * @param integrator 
         */
        void addIntegrator(Integrator *integrator);
        /**
         * @brief Krok simulace
         * 
         */
        void simStep();
        /**
         * @brief Načtení vstupů bloků
         * 
         */
        void dynamic();
        /**
         * @brief Provedení kroku numerické metody
         * 
         */
        void integrate();   // provedu integraci na vsech integratorech
        /**
         * @brief Provede sběr statistik
         * 
         */
        void gatherStatistics();
        /**
         * @brief Getter numerické metody
         * 
         * @return function<double(double currentState, double derivation, double step)> 
         */
        function<double(double currentState, double derivation, double step)> integrationMethod();
        /**
         * @brief Getter statistik
         * 
         * @return ContBlockStatistics 
         */
        ContBlockStatistics statistics();
    private:
        // kolekce všech integrátorů v modelu
        std::vector<Integrator*> _allIntegrators;
        // objekt se statistikami
        ContBlockStatistics _statistics = ContBlockStatistics();
        // lambda funkce numerické metody  
        function<double(double currentState, double derivation, double step)> _integrationMethod;
};




#endif // __CONTBLOCKENGINE_H__