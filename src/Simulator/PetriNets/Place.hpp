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

/**
 * @brief Místo Petriho sítě.
 * 
 */
class Place : public PetriNetsObject {
    public :
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         * @param tokens 
         */
        Place(objectId id, PetriNetsEngineObj engine, int tokens = 0);
        static PlaceObj New(PetriNetsEngineObj engine, int tokens = 0);

        int tokens() { return _tokens; };
        void removeTokens(int cnt);
        void addTokens(int cnt);
        string objTypeName();
        void initialize() { return; };
        PlaceRecord getStatisticsRecord();
    private:
        int _tokens;
};


#endif