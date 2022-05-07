#ifndef CONTSIMULATOR_H
#define CONTSIMULATOR_H

#include <vector>
#include "../SimEngine.hpp"


#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif
using namespace std;

/**
 * @brief Abstarktní třída simulačního engine pro spojitou simulaci
 * 
 */
class ContinousSimEngine : public SimEngine {
    public:
        /**
         * @brief Inicializační funkce. Slouží k nastavení parametrů simulace a provede validaci.
         * 
         * @param beginTime Počáteční čas simulace
         * @param endTime  Koncový čas simulacce
         * @param stepSize  Délka kroku
         * @param sampleRate Interval sběru statistik
         * @return True pokud proběhla inicializace v pořádku
         */
        bool init(double beginTime, double endTime, double stepSize, int sampleRate = 1);
        /**
         * @brief Virutální metoda kroku simulace. Určená k implementaci odvozených tříd.
         * 
         */
        virtual void simStep() = 0;
        /**
         * @brief Metoda provedení simulace
         * 
         */
        void simulate() override;
        /**
         * @brief Metoda volaná před začátkem simulace.
         */
        virtual void gatherStatistics() = 0;
        /**
         * @brief Kontroluje interval sběru statistik.
         * 
         */
        void statisticsStep();
        /**
         * @brief Getter property délky kroku
         * 
         * @return double 
         */
        double stepSize();

    protected:
        // Délka kroku
        double _stepSize = -1;
        // Interval sběru statistik
        int _sampleRate = 1;     // kolikaty kazdy krok se ma zaznamenat
        // Počítadlo mezi kroky jednotlivých sběrů
        int _sampleStep = 0;
        // Příznak, jestli proběhla inicializace v pořádku
        bool _initializedCorrectly = false;
};

#endif