#include "Global.hpp"


shared_ptr<Calendar> Global::calendar = nullptr;

shared_ptr<vector<SimObject*>> Global::simObjects =  nullptr;

shared_ptr<Generator> Global::generator = nullptr;
