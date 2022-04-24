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
        ImmediateTransition(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches, int priority = 0);
        static ImmediateTransitionObj New(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches, int priority = 0);
        
        void planTransitionFiringEvent();
};


////////////////////////////////////////////////////////////////
class TimedTransition;

using TimedTransitionObj = shared_ptr<TimedTransition>;

class TimedTransition : public Transition {
    public:
        int delay;
        std::string objTypeName();
        TimedTransition(objectId id, PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj>  outputArches, int delay);
        TimedTransition(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj>  outputArches, int delay);
        static TimedTransitionObj New(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj>  outputArches, int delay);

        void planTransitionFiringEvent();
};

#endif
