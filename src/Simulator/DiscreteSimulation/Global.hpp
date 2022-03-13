#ifndef GLOBAL_H
#define GLOBAL_H

#include <vector>
#include <memory>
#include "Calendar.hpp"
#include "../SimObject.hpp"
#include "Generator.hpp"
#include "DiscreteSimulationEngine.hpp"

using namespace std;
class DiscreteSimulationEngine;

class Global {
    public:
        static DiscreteSimulationEngine* discreteSimEngine;
};

#endif