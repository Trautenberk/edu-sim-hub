#ifndef __PETRINETSSTATISTICS_H__
#define __PETRINETSSTATISTICS_H__

#include <map>
#include <tuple>
#include <queue>
#include <vector>
#include "../SimObject.hpp"

#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif


class Transition;
class Place;
struct PlaceRecord;
struct TransitionRecord;
struct PNStatisticsRecord;

/**
 * @brief Statistiky simulace Petriho sítě
 * 
 */
struct PetriNetsStatistics {
    /**
     * @brief Mapa míst a jejich kolekce záznamů pro statistiky
     */
    std::map<objectId, std::vector<PlaceRecord>> placeRecords = {};
    /**
     * @brief Mapa přechodů a jejich kolekce záznamů pro statistiky
     * 
     */
    std::map<objectId, std::vector<TransitionRecord>> transitionRecords = {};
    /**
     * @brief Simulační čas
     */
    double simulationTime = -1;
};


/**
 * @brief Záznam statistik místa
 */
struct PlaceRecord  {
    // čas
    double time;
    // kolik tokenů se v čase nachází v místě
    int tokens;
};

/**
 * @brief Záznam statistik přechodu
 */
struct TransitionRecord {
    // čas
    double time;
    // kolikrát byl přechodu doposud odpálen    
    int fired;
};




#endif // __PETRINETSSTATISTICS_H__