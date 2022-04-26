#include "Place.hpp"
#include <iostream>

const string placeTypeName = "Place";


Place::Place(objectId id, PetriNetsEngineObj engine, string label, int tokens) : PetriNetsObject(id, engine)
{
    this->_label = label;
    this->_tokens = tokens; 
    engine->addPlace(this);
    cout << "Place withId: " << this->id() << endl;
}

PlaceObj Place::New(PetriNetsEngineObj engine, string label, int tokens)
{
    return make_shared<Place>(SimObject::createId(placeTypeName), engine, label, tokens);
}

string Place::objTypeName()
{
    return placeTypeName;
}

void Place::addTokens(int cnt)
{
    this->_tokens += cnt;  
}

void Place::removeTokens(int cnt)
{
    if (this->_tokens - cnt < 0)
    {
        cerr << "Cannot remove more tokens then there is present, Place Id: " << this->id() << endl;
        throw "Cannot remove more tokens then there is present";
    }
    this->_tokens -= cnt;
}

PlaceRecord Place::getStatisticsRecord()
{  
    return PlaceRecord { this->engine->time(), this->_tokens };
}

void bbb() { 
    cout << "bbb" << endl;
}



#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(PlaceClass) {

        emscripten::class_<Place>("Place")
        .smart_ptr<shared_ptr<Place>>("shared_ptr<Place>")
        // .constructor(&std::make_shared<Place, shared_ptr<PetriNetsEngine>, string, int>)
        .constructor(&std::make_shared<Place, objectId, PetriNetsEngineObj, string, int>)
        .function("tokens", &Place::tokens);

        emscripten::class_<TestClass>("TestClassX")
        .constructor()
        .function("hello", &TestClass::hello);

        emscripten::function("bbb", &bbb);  // TODO smazat
    }
#endif