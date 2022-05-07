#ifndef DiscreteEngine_H
#define DiscreteEngine_H

#include "Calendar.hpp"
#include <vector>
#include <iostream>
#include <memory>
#include <ctime>
#include "../SimEngine.hpp"

using namespace std;

/**
 * @brief Abstraktní třída pro diskrétní simulaci modelu pomocí algoritmu Next-event
 */
class DiscreteEngine : public SimEngine {
    public:
        /**
         * @brief Inicilizační metoda. Nastaví modelový čas a případně maximální počet iterací, pokud nedochází k posunu času.
         * 
         * @param endTime 
         * @param maxIteration 
         */
        void init(float endTime, int maxIteration = 1000);
        /**
         * @brief Provedení simulace.
         */
        virtual void simulate() override;
        /**
         * @brief Provede posun modelového času
         * 
         * @param nextEventTime 
         */
        virtual void updateTime(double nextEventTime);
        /**
         * @brief Zpracuje event.
         * 
         * @param event 
         */
        virtual void processEvent(Event& event);
        /**
         * @brief Sběr statistik
         */
        virtual void gatherStatistics() = 0;
        /**
         * @brief Struktura kalendáře
         */
        Calendar calendar = Calendar();

    private:
        int _maxIteration;
        int _iteration;
};

#endif