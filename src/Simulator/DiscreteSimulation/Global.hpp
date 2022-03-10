#ifndef GLOBAL_H
#define GLOBAL_H

#include <vector>
#include <memory>
#include "Calendar.hpp"
#include "../SimObject.hpp"
#include "Generator.hpp"

using namespace std;

class Global {
    public:
        static shared_ptr<Calendar> calendar;
        static shared_ptr<vector<SimObject*>> simObjects;
        static shared_ptr<Generator> generator;
};

#endif