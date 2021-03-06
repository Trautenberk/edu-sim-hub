#include "Place.hpp"
#include <iostream>

const string placeTypeName = "Place";

// Konstruktor
Place::Place(objectId id, PetriNetsEngineObj engine, int tokens) : PetriNetsObject(id, engine)
{
    this->_tokens = tokens; 
    engine->addPlace(this);
}

// Pomocná metoda pro konstrukci
PlaceObj Place::New(PetriNetsEngineObj engine, int tokens)
{
    return make_shared<Place>(SimObject::createId(placeTypeName), engine, tokens);
}

string Place::objTypeName()
{
    return placeTypeName;
}

// Metoda pro přidání tokenů do místa
void Place::addTokens(int cnt)
{
    this->_tokens += cnt;  
}

// Metoda pro odebrání tokenů z místa
void Place::removeTokens(int cnt)
{
    if (this->_tokens - cnt < 0)
    {
        cerr << "Cannot remove more tokens then there is present, Place Id: " << this->id() << endl;
        throw "Cannot remove more tokens then there is present";
    }
    this->_tokens -= cnt;
}

// Vytvoří záznam statistik pro daný časový okamžik
PlaceRecord Place::getStatisticsRecord()
{  
    return PlaceRecord { this->engine->time(), this->_tokens };
}




#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(PlaceClass) {

        emscripten::class_<Place>("Place")
        .smart_ptr<shared_ptr<Place>>("shared_ptr<Place>")
        .constructor(&std::make_shared<Place, objectId, PetriNetsEngineObj, int>)
        .function("tokens", &Place::tokens);
    }
#endif