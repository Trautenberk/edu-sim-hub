#ifndef TRANSITION_H
#define TRANSITION_H

#include "../SimObject.hpp"
#include "Arch.hpp"
#include <vector>
#include <iostream>
#include "../DiscreteSimulation/Global.hpp"
#include <limits>
#include <algorithm>

using namespace std;

class Transition : public SimObject
{
    public:
        string label;
        vector<shared_ptr<InputArch>> inputArches = {};
        vector<shared_ptr<OutputArch>> outputArches = {};
        vector<shared_ptr<Arch>> allArches = {};
        deque<int> plannedEventsId = {};

        Transition(string label, vector<shared_ptr<InputArch>> inputArches, vector<shared_ptr<OutputArch>> outputArches);
        Transition(string label, shared_ptr<InputArch> inputArch, shared_ptr<OutputArch> outputArch);

        virtual string getObjType() = 0;
        void initialize();
        int allInputArchSsatisfied();
        virtual void planTransitionFiringEvent() = 0;
        void removeTransitionFiringEvent();
        void rePlanTransition();
        void fire(int eventId);
        bool hasPlaceOnInput(vector<string> &placeId);
        vector<string> placeIdsOnInput = {};
        vector<string> placeIdsOnOutput = {};
};


class ImmediateTransition : public Transition {
    public:
        int priority;
        string getObjType();
        ImmediateTransition(string label, vector<shared_ptr<InputArch>> inputArches, vector<shared_ptr<OutputArch>> outputArches, int priority = 0);
        ImmediateTransition(string label, shared_ptr<InputArch> inputArch, shared_ptr<OutputArch> outputArch, int priority = 0);
        void planTransitionFiringEvent();
};


class TimedTransition : public Transition {
    public:
        int delay;
        string getObjType();
        TimedTransition(string label, vector<shared_ptr<InputArch>> inputArches, vector<shared_ptr<OutputArch>> outputArches, int delay);
        TimedTransition(string label, shared_ptr<InputArch> inputArch, shared_ptr<OutputArch> outputArch, int delay);
        void planTransitionFiringEvent();
};

#endif
