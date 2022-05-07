#ifndef ARCH_H
#define ARCH_H


#include "PetriNetsObject.hpp"
#include "Place.hpp"
#include <iostream>
#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

using namespace std;

////////////////////////////////////////////////////////////////
class Arc;
using ArcObj = shared_ptr<Arc>;

/**
 * @brief Hrana Petriho sítě
 * 
 */
class Arc : public PetriNetsObject {
    public:
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         * @param targetPlace 
         * @param weight 
         */
        Arc(objectId id, PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1);
        virtual string objTypeName() = 0;
        /**
         * @brief Váha hrany
         * 
         * @return int 
         */
        int weight() const {return _weight;};
        /**
         * @brief Místo které hrana spojuje
         * 
         */
        shared_ptr<Place> targetPlace;
        /**
         * @brief Provedení hrany, odebere nebo přidá tokeny do daného místa, podle toho,
         * jestli se jedná o vstupní nebo výstupní hranu. 
         */
        virtual void execute() = 0;
        /**
         * @brief Inicializace
         * 
         */
        void initialize() { return; };
    protected:
        // Váha hrany
        int _weight;
};

////////////////////////////////////////////////////////////////
class InputArc;
using InputArcObj = shared_ptr<InputArc>;

/**
 * @brief Vstupní hrana přechodu.
 * 
 */
class InputArc : public Arc {
    public:
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         * @param targetPlace 
         * @param weight 
         */
        InputArc(objectId id, PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1);
        static InputArcObj New(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1); 
        string objTypeName();
        /**
         * @brief Provedení hrany. Odebere počet daný váhou tokenů z místa.
         * 
         */
        void execute();
        /**
         * @brief Vrací příznak, jestli je v místě dostečný počet tokenů, aby byla splněna podmínka.
         * 
         * @return int 
         */
        int satisfied();
};


////////////////////////////////////////////////////////////////
class OutputArc;
using OutputArcObj = shared_ptr<OutputArc>;

/**
 * @brief Výstupní hrana přechodu.
 * 
 */
class OutputArc : public Arc {
    public:
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         * @param targetPlace 
         * @param weight 
         */
        OutputArc(objectId id, PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1);
        static OutputArcObj New(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1);
        string objTypeName();
        /**
         * @brief Přidá tokeny do cílového místa
         * 
         */
        void execute();
};

#endif