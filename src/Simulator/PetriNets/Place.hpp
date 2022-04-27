#ifndef PLACE_H
#define PLACE_H

#include <string>
#include "PetriNetsObject.hpp"
#include <vector>
#include "PetriNetsStatistics.hpp"

#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

using namespace std;

using PlaceObj = shared_ptr<Place>;

class Place : public PetriNetsObject {
    public :

        Place(objectId id, PetriNetsEngineObj engine, string label, int tokens = 0);
        static PlaceObj New(PetriNetsEngineObj engine, string label, int tokens = 0);

        string label() { return _label; };
        int tokens() { return _tokens; };
        void removeTokens(int cnt);
        void addTokens(int cnt);
        string objTypeName();
        void initialize() { return; };
        PlaceRecord getStatisticsRecord();
    private:
        string _label;
        int _tokens;
};


#endif