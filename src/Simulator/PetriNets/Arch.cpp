#include "Arch.hpp"

using namespace std;

Arch::Arch(shared_ptr<PetriNetsEngine> engine, shared_ptr<Place> targetPlace, int weight, string auxName) : PetriNetsObject(engine, auxName)
{
    if (weight < 1) {
        cerr << "Error: cannot initialize arch with weight smaller than one" << endl;
        throw new exception();
    }
    
    this->targetPlace = targetPlace;
    this->_weight = weight;
}

/// InputArch
InputArch::InputArch(shared_ptr<PetriNetsEngine> engine, shared_ptr<Place> targetPlace, int weight, string auxName) 
: Arch(engine, targetPlace, weight, auxName)
{}

void InputArch::execute()
{
    this->targetPlace->removeTokens(this->_weight);    
}

// kolikrat je prechod uspokojen
int InputArch::satisfied() 
{
    return this->targetPlace->tokens() / _weight;
}

PNObj<InputArch> InputArch::New(PNObj<PetriNetsEngine> engine, PNObj<Place> targetPlace, int weight, string auxName)
{
    return make_shared<InputArch>(engine, targetPlace, weight, auxName);
}


/// OutpuArch
OutputArch::OutputArch(PNObj<PetriNetsEngine> engine, PNObj<Place> targetPlace, int weight, string auxName)
: Arch(engine, targetPlace, weight, auxName)
{}

PNObj<OutputArch> OutputArch::New(PNObj<PetriNetsEngine> engine, PNObj<Place> targetPlace, int weight, string auxName)
{
    return make_shared<OutputArch>(engine, targetPlace, weight, auxName);
}

void OutputArch::execute()
{
    this->targetPlace->addTokens(this->_weight);
}


#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(Arch) {
        emscripten::class_<InputArch>("InputArch")
        .smart_ptr<shared_ptr<InputArch> >("shared_ptr<InputArch>")
        // .constructor(&std::make_shared<InputArch, shared_ptr<PetriNetsEngine>, shared_ptr<Place>, int>)
        .constructor(&std::make_shared<InputArch, shared_ptr<PetriNetsEngine>, shared_ptr<Place>, int, string>);

        emscripten::class_<OutputArch>("OutputArch")
        .smart_ptr<shared_ptr<OutputArch> >("shared_ptr<OutputArch>")
        // .constructor(&std::make_shared<InputArch, shared_ptr<PetriNetsEngine>, shared_ptr<Place>, int>)
        .constructor(&std::make_shared<OutputArch, shared_ptr<PetriNetsEngine>, shared_ptr<Place>, int, string>);
    }
#endif