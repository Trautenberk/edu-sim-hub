#ifndef PETRI_NETS_ENGINE_H
#define PETRI_NETS_ENGINE_H

#include "../DiscreteSimulation/DiscreteEngine.hpp"
#include "PetriNetsStatistics.hpp"
#include <memory>

class Transition;
class PetriNetsEngine;

using PetriNetsEngineObj = shared_ptr<PetriNetsEngine>;

/**
 * @brief Simulační engine modelu Petriho sítě
 * 
 */
class PetriNetsEngine : public DiscreteEngine {
    public:
        /**
         * @brief Konstruktor
         * 
         */
        PetriNetsEngine();
        static PetriNetsEngineObj New();
        /**
         * @brief Přidá místo z modelu do interní kolekce
         * 
         * @param place 
         */
        void addPlace(Place* place);
        /**
         * @brief Přidá přechod z modelu do interní kolekce
         * 
         * @param transition 
         */
        void addTransition(Transition* transition);

        /**
         * @brief Getter interní kolekce všech přechodů
         * 
         * @return vector<Transition*>& 
         */
        vector<Transition*>& allTransitions();

        /**
         * @brief Sběr statistik
         * 
         */
        void gatherStatistics() override;

        PetriNetsStatistics statistics();
    private:
        // interní kolekce všech přechodů
        vector<Transition*> _allTransitions = {};
        // interní kolekce všech míst            
        vector<Place*> _allPlaces = {};
        // objekt statistik
        PetriNetsStatistics _statistics = PetriNetsStatistics();
};

#endif