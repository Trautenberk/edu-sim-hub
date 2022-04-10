#ifndef TRANSITION_H
#define TRANSITION_H

#include "Arch.hpp"
#include <vector>
#include <iostream>
#include <limits>
#include <algorithm>

#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

class PetriNetsObject;
// using namespace std;
template <typename T> using SPVec = vector<shared_ptr<T>>;

class Transition : public PetriNetsObject
{
    public:
        std::string label;
        vector<shared_ptr<InputArch>> inputArches = {};
        vector<shared_ptr<OutputArch>> outputArches = {};
        vector<shared_ptr<Arch>> allArches = {};
        deque<int> plannedEventsId = {};
        int firedCnt = 0;

        Transition(shared_ptr<PetriNetsEngine> engine, std::string label, SPVec<InputArch> inputArches, SPVec<OutputArch> outputArches, std::string auxName = "");
        void initialize();
        int allInputArchSsatisfied();
        virtual void planTransitionFiringEvent() = 0;
        void removeTransitionFiringEvent();
        void rePlanTransition();
        void fire(int eventId);
        bool hasPlaceOnInput(vector<int> &placeId);
        vector<int> placeIdsOnInput = {};
        vector<int> placeIdsOnOutput = {};

        void gatherStatistics();
};


class ImmediateTransition : public Transition {
    public:
        int priority;
        std::string objTypeName() {return "ImmediateTransition";};
        ImmediateTransition(PNObj<PetriNetsEngine> engine, std::string label, SPVec<InputArch> inputArches, SPVec<OutputArch> outputArches, int priority = 0, std::string auxName = "");
        static PNObj<ImmediateTransition> New(PNObj<PetriNetsEngine> engine, std::string label, SPVec<InputArch> inputArches, SPVec<OutputArch> outputArches, int priority = 0, std::string auxName = "");
        
        void planTransitionFiringEvent();
};


class TimedTransition : public Transition {
    public:
        int delay;
        std::string objTypeName() {return "TimedTransition";};
        TimedTransition(shared_ptr<PetriNetsEngine> engine, std::string label, SPVec<InputArch> inputArches, SPVec<OutputArch>  outputArches, int delay, std::string auxName = "");
        static PNObj<TimedTransition> New(shared_ptr<PetriNetsEngine> engine, std::string label, SPVec<InputArch> inputArches, SPVec<OutputArch>  outputArches, int delay, std::string auxName = "");

        void planTransitionFiringEvent();
};

#endif
