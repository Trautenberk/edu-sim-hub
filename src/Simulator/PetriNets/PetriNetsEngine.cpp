#include "PetriNetsEngine.hpp"

PetriNetsEngine::PetriNetsEngine() : DiscreteEngine() 
{
    cout << "PetriNetsEngine constructor" << endl;
}

#ifdef EMSCRIPTEN
 EMSCRIPTEN_BINDINGS(PetriNetsEngine) {
     emscripten::class_<PetriNetsEngine, emscripten::base<DiscreteEngine>>("PetriNetsEngine")
     .smart_ptr_constructor<shared_ptr<PetriNetsEngine>>("shared_ptr<PetriNetsEngine>", &std::make_shared<PetriNetsEngine>);
 }
#endif