#include "DiscreteEngine.hpp"

void DiscreteEngine::gatherStatistics()
{
    for (auto& object : this->_simObjects)
    {
        object->gatherStatistics();
    }
}

void DiscreteEngine::init(float endTime, int maxIteration)
{  
    this->_endTime = endTime;
    this->_time = 0;
    this->_maxIteration = maxIteration;
    this->_iteration = 0;
    
    cout << "Begin initialization..." << endl;
    for (auto& obj : this->_simObjects)
    {
        // cout << "initializing object: " << obj->name() << endl;
        obj->initialize();
        // cout << "object init finished" << endl;
    }
    cout << "Initialization completed..." << endl;
}

void DiscreteEngine::simulate()
{
    cout << "Simulation begin" << endl;
    cout << "Total SimObject count:" << this->_simObjects.size() << endl;
    auto beginSimTime = std::clock();

    while(!calendar.isEmpty() && this->_iteration <= this->_maxIteration){
        auto event = calendar.getNextEvent();
        if(event.time > this->_endTime){
            break;
        }                                   // TODO prepsat do metod
        this->_time = event.time; // posun času
        event.func(event.id);   // provedení eventu
        this->_iteration++; // TODO odstranit/ vylepsit, vyclenit do samostatne metody, detekce v modelu
    }
    
    auto endSimTime = std::clock();
    cout << "Simulation finished at model time: " << this->_time << ", simulation duration: " << double(endSimTime - beginSimTime) / CLOCKS_PER_SEC << "s" << endl;
}

void DiscreteEngine::addDiscreteObject(DiscreteSimObject *object)
{
    this->_simObjects.push_back(object);
}

#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(DiscreteEngine) {
        emscripten::class_<DiscreteEngine>("DiscreteEngine")
        .smart_ptr_constructor<shared_ptr<DiscreteEngine>>("shared_ptr<DiscreteEngine>", &std::make_shared<DiscreteEngine>)
        .function("init", &DiscreteEngine::init)
        .function("simulate", &DiscreteEngine::simulate);
    }
#endif