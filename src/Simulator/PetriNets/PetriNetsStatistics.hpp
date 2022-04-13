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
    std::vector<PNStatisticsRecord> records;
    double simulationTime = -1;
};

struct PNStatisticsRecord {
    double time;
    std::map<objectId, PlaceRecord> placeRecords = {};
    std::map<objectId, TransitionRecord> transitionRecords = {};
};

struct PlaceRecord  {
    int tokens;
};

struct TransitionRecord {
    int fired;
};




#endif // __PETRINETSSTATISTICS_H__