#include "Arc.hpp"

using namespace std;

// Konstruktor
Arc::Arc(string id, PetriNetsEngineObj engine, PlaceObj targetPlace, int weight) : PetriNetsObject(id, engine)
{
    if (weight < 1) {
        cerr << "Error: cannot initialize arch with weight smaller than one" << endl;
        throw new exception();
    }
    
    this->targetPlace = targetPlace;
    this->_weight = weight;
}

/// InputArc
const string inputArcTypeName = "InputArc";

// Konstruktor
InputArc::InputArc(objectId id, PetriNetsEngineObj engine, shared_ptr<Place> targetPlace, int weight) 
: Arc(id, engine, targetPlace, weight)
{}

string InputArc::objTypeName()
{
    return inputArcTypeName;
}

// Provedení vstupní hrany, odebere počet tokenů odpovídající váze hrany z místa
void InputArc::execute()
{
    this->targetPlace->removeTokens(this->_weight);    
}

// kolikrát je přechod uspokojen
int InputArc::satisfied() 
{
    return this->targetPlace->tokens() / _weight;
}

// Pomocná metoda pro konstrukci
InputArcObj InputArc::New(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight)
{
    return make_shared<InputArc>(SimObject::createId(inputArcTypeName), engine, targetPlace, weight);
}


/// OutpuArch
const string outputArcTypeName = "OutputArc";

// Konstruktor
OutputArc::OutputArc(objectId id, PetriNetsEngineObj engine, PlaceObj targetPlace, int weight)
: Arc(id, engine, targetPlace, weight)
{}

// POmocná metoda pro konstrukci
OutputArcObj OutputArc::New(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight)
{
    return make_shared<OutputArc>(SimObject::createId(outputArcTypeName), engine, targetPlace, weight);
}

string OutputArc::objTypeName()
{
    return outputArcTypeName;
}

// Přidá počet tokenů odpovídající váze hrany do místa
void OutputArc::execute()
{
    this->targetPlace->addTokens(this->_weight);
}


#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(Arch) {
        emscripten::class_<InputArc>("InputArc")
        .smart_ptr<InputArcObj>("InputArchObj")
        // .constructor(&std::make_shared<InputArch, objectId , PetriNetsEngineObj, shared_ptr<Place>, int>);
        .constructor(&std::make_shared<InputArc, objectId ,PetriNetsEngineObj, PlaceObj, int>);

        emscripten::class_<OutputArc>("OutputArc")
        .smart_ptr<OutputArcObj>("OutputArcObj")
        // .constructor(&std::make_shared<OutputArch, PetriNetsEngineObj, PlaceObj, int>);
        .constructor(&std::make_shared<OutputArc, objectId, PetriNetsEngineObj, PlaceObj, int>);
    }
#endif