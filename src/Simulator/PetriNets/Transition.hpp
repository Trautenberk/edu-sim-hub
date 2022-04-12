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

        Transition(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches, std::string auxName = "");
        void initialize();
        int allInputArchSsatisfied();
        virtual void planTransitionFiringEvent() = 0;
        void removeTransitionFiringEvent();
        void rePlanTransition();
        void fire(int eventId);
        bool hasPlaceOnInput(vector<int> &placeId);
        vector<int> placeIdsOnInput = {};
        vector<int> placeIdsOnOutput = {};

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
        std::string objTypeName() {return "ImmediateTransition";};
        ImmediateTransition(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches, int priority = 0, std::string auxName = "");
        static ImmediateTransitionObj New(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches, int priority = 0, std::string auxName = "");
        
        void planTransitionFiringEvent();
};


////////////////////////////////////////////////////////////////
class TimedTransition;

using TimedTransitionObj = shared_ptr<TimedTransition>;

class TimedTransition : public Transition {
    public:
        int delay;
        std::string objTypeName() {return "TimedTransition";};
        TimedTransition(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj>  outputArches, int delay, std::string auxName = "");
        static TimedTransitionObj New(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj>  outputArches, int delay, std::string auxName = "");

        void planTransitionFiringEvent();
};

#endif
