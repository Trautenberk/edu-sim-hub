#include "Arch.hpp"

using namespace std;

Arch::Arch(string id, PetriNetsEngineObj engine, PlaceObj targetPlace, int weight) : PetriNetsObject(id, engine)
{
    if (weight < 1) {
        cerr << "Error: cannot initialize arch with weight smaller than one" << endl;
        throw new exception();
    }
    
    this->targetPlace = targetPlace;
    this->_weight = weight;
}

/// InputArch
const string inputArchTypeName = "InputArch";

InputArch::InputArch(objectId id, PetriNetsEngineObj engine, shared_ptr<Place> targetPlace, int weight) 
: Arch(id, engine, targetPlace, weight)
{}

string InputArch::objTypeName()
{
    return inputArchTypeName;
}

void InputArch::execute()
{
    this->targetPlace->removeTokens(this->_weight);    
}

// kolikrat je prechod uspokojen
int InputArch::satisfied() 
{
    return this->targetPlace->tokens() / _weight;
}

InputArchObj InputArch::New(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight)
{
    return make_shared<InputArch>(SimObject::createId(inputArchTypeName), engine, targetPlace, weight);
}


/// OutpuArch

const string outputArchTypeName = "OutputArch";


OutputArch::OutputArch(objectId id, PetriNetsEngineObj engine, PlaceObj targetPlace, int weight)
: Arch(id, engine, targetPlace, weight)
{}

OutputArchObj OutputArch::New(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight)
{
    return make_shared<OutputArch>(SimObject::createId(outputArchTypeName), engine, targetPlace, weight);
}

string OutputArch::objTypeName()
{
    return outputArchTypeName;
}

void OutputArch::execute()
{
    this->targetPlace->addTokens(this->_weight);
}


#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(Arch) {
        emscripten::class_<InputArch>("InputArch")
        .smart_ptr<InputArchObj>("InputArchObj")
        // .constructor(&std::make_shared<InputArch, objectId , PetriNetsEngineObj, shared_ptr<Place>, int>);
        .constructor(&std::make_shared<InputArch, objectId ,PetriNetsEngineObj, PlaceObj, int>);

        emscripten::class_<OutputArch>("OutputArch")
        .smart_ptr<OutputArchObj>("OutputArchObj")
        // .constructor(&std::make_shared<OutputArch, PetriNetsEngineObj, PlaceObj, int>);
        .constructor(&std::make_shared<OutputArch, objectId, PetriNetsEngineObj, PlaceObj, int>);
    }
#endif