#include "Place.hpp"
#include <iostream>

Place::Place(shared_ptr<PetriNetsEngine> engine, string label, int tokens, string auxName) : PetriNetsObject(engine, auxName)
{
    this->_label = label;
    this->_tokens = tokens; 
    engine->addPlace(this);
}

PNObj<Place> Place::New(shared_ptr<PetriNetsEngine> engine, string label, int tokens, string auxName)
{
    return make_shared<Place>(engine, label, tokens, auxName);
}

void Place::addTokens(int cnt)
{
    this->_tokens += cnt;  
}

void Place::removeTokens(int cnt)
{
    if (this->_tokens - cnt < 0)
    {
        cerr << "Cannot remove more tokens then there is present, Place Id: " << this->name() << endl;
        throw "Cannot remove more tokens then there is present";
    }
    this->_tokens -= cnt;
}

PlaceRecord Place::getStatisticsRecord()
{
    return PlaceRecord(this->_tokens);
}

void bbb() { 
    cout << "bbb" << endl;
}



#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(PlaceClass) {

        emscripten::class_<Place>("Place")
        .smart_ptr<shared_ptr<Place>>("shared_ptr<Place>")
        // .constructor(&std::make_shared<Place, shared_ptr<PetriNetsEngine>, string, int>)
        .constructor(&std::make_shared<Place, shared_ptr<PetriNetsEngine>, string, int, string>)
        .function("tokens", &Place::tokens);

        emscripten::class_<TestClass>("TestClassX")
        .constructor()
        .function("hello", &TestClass::hello);

        emscripten::function("bbb", &bbb);  // TODO smazat
    }
#endif