#ifndef TRANSITION_H
#define TRANSITION_H

#include "../SimObject.hpp"
#include "Arch.hpp"
#include <vector>
#include <iostream>
#include "../DiscreteSimulation/Global.hpp"

using namespace std;

class Transition : public SimObject
{
    public:
        vector<InputArch*> inputArches = {};
        vector<OutputArch*> outputArches = {};
        vector<Arch*> allArches = {};
        deque<int> plannedEventsId = {};
        string label() const {return _label;};
        bool enabled() const { return _enabled;};
        bool checkIfEnabled();
        Transition(string label, vector<InputArch*> inputArches, vector<OutputArch*> outputArches);
        Transition(string label, InputArch* inputArches, OutputArch* outputArches);
        ~Transition();
        string getObjType();
        void initialize();
        bool allInputArchSsatisfied();
        void planTransitionFiringEvent();
        void fire();
    private:
        string _label;
        bool _enabled;
};

#endif
