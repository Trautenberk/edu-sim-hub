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
        vector<shared_ptr<InputArch>> inputArches = {};
        vector<shared_ptr<OutputArch>> outputArches = {};
        vector<shared_ptr<Arch>> allArches = {};
        deque<int> plannedEventsId = {};
        string label() const {return _label;};
        bool enabled() const { return _enabled;};
        bool checkIfEnabled();
        Transition(string label, vector<shared_ptr<InputArch>> inputArches, vector<shared_ptr<OutputArch>> outputArches);
        Transition(string label, shared_ptr<InputArch> inputArch, shared_ptr<OutputArch> outputArch);
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
