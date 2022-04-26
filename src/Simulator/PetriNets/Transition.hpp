#ifndef TRANSITION_H
#define TRANSITION_H

#include "Arch.hpp"
#include <vector>
#include <iostream>
#include <limits>
#include <algorithm>
#include "PetriNetsStatistics.hpp"

#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

class PetriNetsObject;

class Transition : public PetriNetsObject
{
    public:
        std::string label;
        vector<InputArchObj> inputArches = {};
        vector<OutputArchObj> outputArches = {};
        vector<ArchObj> allArches = {};
        deque<int> plannedEventsId = {};

        Transition(objectId id, PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches);
        void initialize();
        int allInputArchSsatisfied();
        virtual void planTransitionFiringEvent() = 0;
        void removeTransitionFiringEvent();
        void rePlanTransition();
        void fire(int eventId);
        bool hasPlaceOnInput(vector<objectId> &placeId);
        vector<objectId> placeIdsOnInput = {};
        vector<objectId> placeIdsOnOutput = {};

        TransitionRecord getStatisticsRecord();
        int firedCnt();
    private:
        int _firedCnt = 0;

};

////////////////////////////////////////////////////////////////
class ImmediateTransition;

using ImmediateTransitionObj = shared_ptr<ImmediateTransition>;

class ImmediateTransition : public Transition {
    public:
        int priority;
        std::string objTypeName();
        ImmediateTransition(objectId id, PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches, int priority = 0);
        static ImmediateTransitionObj New(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches, int priority = 0);
        
        void planTransitionFiringEvent();
};


////////////////////////////////////////////////////////////////
/// TimedTranstio
class TimedTransition;

using TimedTransitionObj = shared_ptr<TimedTransition>;

class TimedTransition : public Transition {
    public:
        virtual double getDelay() = 0;
        std::string objTypeName() override;
        TimedTransition(objectId id, PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj>  outputArches, double delayValue);
        void planTransitionFiringEvent();

    protected:
        double _delayValue;
};




////////////////////////////////////////////////////////////////////////
/// TimedConstantTransition
class TimedConstantTransition;

using TimedConstantTransitionObj = shared_ptr<TimedConstantTransition>;

class TimedConstantTransition : public TimedTransition {
    public:
        double getDelay() override;
        std::string objTypeName() override;

        TimedConstantTransition(objectId id, PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj>  outputArches, double delayValue);
        static TimedConstantTransitionObj New(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj>  outputArches, double delayValue);
};


////////////////////////////////////////////
/// TimedExponentialTransition

class TimedExponentialTransition;

using TimedExponentialTransitionObj = shared_ptr<TimedExponentialTransition>;

class TimedExponentialTransition : public TimedTransition {
    public:
        double getDelay() override;
        std::string objTypeName() override;

        TimedExponentialTransition(objectId id, PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj>  outputArches, double delayValue);
        static TimedExponentialTransitionObj New(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj>  outputArches, double delayValue);
};

#endif
