#include "DiscreteEngine.hpp"

void DiscreteEngine::time(double time) 
{
    this->_time = time;
}

const double DiscreteEngine::time() const 
{
    return this->_time;
}

void DiscreteEngine::gatherStatistics()
{
    for (auto& object : this->simObjects)
    {
        object->gatherStatistics();
    }
}

void DiscreteEngine::init(float endTime, int maxIteration)
{  
    this->endTime = endTime;
    this->time(0);
    this->maxIteration = maxIteration;
    this->iteration = 0;
    
    cout << "Begin initialization..." << endl;
    for (auto& obj : this->simObjects)
    {
        // cout << "initializing object: " << obj->name() << endl;
        obj->initialize();
        // cout << "object init finished" << endl;
    }
    cout << "Initialization completed..." << endl;
}

void DiscreteEngine::simulate()
{
    this->time(0);

    cout << "Simulation begin" << endl;
    cout << "Total SimObject count:" << this->simObjects.size() << endl;
    auto beginSimTime = std::clock();

    while(!calendar.isEmpty() && this->iteration <= this->maxIteration){
        auto event = calendar.getNextEvent();
        if(event.time > this->endTime){
            break;
        }
        this->time(event.time);
        event.func(event.id);
        this->iteration++; // TODO odstranit/ vylepsit, vyclenit do samostatne metody, detekce v modelu
    }
    
    auto endSimTime = std::clock();
    cout << "Simulation finished at model time: " << this->time() << ", simulation duration: " << double(endSimTime - beginSimTime) / CLOCKS_PER_SEC << "s" << endl;

}

void DiscreteEngine::clear()
{
    this->calendar.clear();
    this->endTime = 0;
    this->time(0);
    this->simObjects = {};
    this->iteration = 0;
}

DiscreteEngine::DiscreteEngine()
{}

#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(DiscreteEngine) {
        emscripten::class_<DiscreteEngine>("DiscreteEngine")
        .smart_ptr_constructor<shared_ptr<DiscreteEngine>>("shared_ptr<DiscreteEngine>", &std::make_shared<DiscreteEngine>)
        .function("init", &DiscreteEngine::init)
        .function("simulate", &DiscreteEngine::simulate);
    }
#endif