#ifndef TRANSITION_H
#define TRANSITION_H

#include "Arc.hpp"
#include <vector>
#include <iostream>
#include <limits>
#include <algorithm>
#include "PetriNetsStatistics.hpp"

#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

class PetriNetsObject;

/**
 * @brief Abstraktní třída pro přechod Petriho sítě.
 * 
 */
class Transition : public PetriNetsObject
{
    public:
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         * @param inputArcs 
         * @param outputArcs 
         */
        Transition(objectId id, PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj> outputArcs);

        /**
         * @brief Inicializační metoda
         */
        void initialize() override;
        /**
         * @brief Vrací příznak, jestli vstupní místa obsahují dostatečný počet tokenů
         * 
         * @return int 
         */
        int allInputArcSsatisfied();
        /**
         * @brief Naplánuje svoje provedení do kalendáře
         * 
         */
        virtual void planTransitionFiringEvent() = 0;
        /**
         * @brief Odstraní naplánovanou událost provedení přechodu z kalendáře
         * 
         */
        void removeTransitionFiringEvent();
        /**
         * @brief Přeplánuje přechod při změně na vstupních místech
         */
        void rePlanTransition();
        /**
         * @brief Provede odpálení přechodu
         * 
         * @param eventId 
         */
        void fire(int eventId);
        /**
         * @brief Vrací příznak, jestli má přechod místo s daným id jako vstupní
         * 
         * @param placeId 
         * @return true 
         * @return false 
         */
        bool hasPlaceOnInput(vector<objectId> &placeId);
        /**
         * @brief Vrací záznam statistik v daném čase
         * 
         * @return TransitionRecord 
         */
        TransitionRecord getStatisticsRecord();
        /**
         * @brief Vrací, kolikrát byl přechod odpálen
         * 
         * @return int 
         */
        int firedCnt();
    protected:
        int _firedCnt = 0;
        vector<InputArcObj> _inputArcs = {};
        vector<OutputArcObj> _outputArcs = {};
        vector<ArcObj> _allArcs = {};
        deque<int> _plannedEventsId = {};
        vector<objectId> placeIdsOnInput = {};
        vector<objectId> placeIdsOnOutput = {};

};

////////////////////////////////////////////////////////////////
class ImmediateTransition;

using ImmediateTransitionObj = shared_ptr<ImmediateTransition>;

/**
 * @brief Okamžitý přechod Petriho sítě.
 */
class ImmediateTransition : public Transition {
    public:
        /**
         * @brief Priorita přechodu
         */
        int priority;
        std::string objTypeName();
        ImmediateTransition(objectId id, PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj> outputArcs, int priority = 0);
        static ImmediateTransitionObj New(PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj> outputArcs, int priority = 0);
        void planTransitionFiringEvent();
};


////////////////////////////////////////////////////////////////
/// TimedTranstio
class TimedTransition;
using TimedTransitionObj = shared_ptr<TimedTransition>;

/**
 * @brief Časovaný přechod Petriho sítě.
 * 
 */
class TimedTransition : public Transition {
    public:
        /**
         * @brief Vrací zpoždění
         * 
         * @return double 
         */
        virtual double getDelay() = 0;
        std::string objTypeName() override;
        TimedTransition(objectId id, PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue);
        void planTransitionFiringEvent() override;

    protected:
        double _delayValue;
};




////////////////////////////////////////////////////////////////////////
/// TimedConstantTransition
class TimedConstantTransition;
using TimedConstantTransitionObj = shared_ptr<TimedConstantTransition>;

/**
 * @brief Časovaný přechod s konstantním zpožděním.
 */
class TimedConstantTransition : public TimedTransition {
    public:
        /**
         * @brief Vrací zpoždění dané konstatní hodnotou
         * 
         * @return double 
         */
        double getDelay() override;
        std::string objTypeName() override;

        TimedConstantTransition(objectId id, PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue);
        static TimedConstantTransitionObj New(PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue);
};


////////////////////////////////////////////
/// TimedExponentialTransition

class TimedExponentialTransition;
using TimedExponentialTransitionObj = shared_ptr<TimedExponentialTransition>;

/**
 * @brief Časovaný přechod se zpožděním daným exponenciálním rozložením.
 * 
 */
class TimedExponentialTransition : public TimedTransition {
    public:
        /**
         * @brief Vrací zpoždění jako výsledek funkce generující exponenciálního rozložení
         * 
         * @return double 
         */
        double getDelay() override;
        std::string objTypeName() override;

        TimedExponentialTransition(objectId id, PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue);
        static TimedExponentialTransitionObj New(PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue);
};

#endif
