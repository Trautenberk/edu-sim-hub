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

struct PetriNetsStatistics {
    std::map<objectId, std::vector<PlaceRecord>> placeRecords = {};
    std::map<objectId, std::vector<TransitionRecord>> transitionRecords = {};
    double simulationTime = -1;
};


struct PlaceRecord  {
    double time;
    int tokens;
};

struct TransitionRecord {
    double time;
    int fired;
};




#endif // __PETRINETSSTATISTICS_H__