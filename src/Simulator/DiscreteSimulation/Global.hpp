#ifndef GLOBAL_H
#define GLOBAL_H

#include <vector>
#include <memory>
#include "Calendar.hpp"
#include "../SimObject.hpp"
#include "Generator.hpp"
#include "DiscreteEngine.hpp"

using namespace std;
class DiscreteEngine;

class Global {
    public:
        static DiscreteEngine* discreteSimEngine;
};

#endif