#ifndef __PETRINETSSTATISTICS_H__
#define __PETRINETSSTATISTICS_H__

#include <map>
#include <tuple>
#include <queue>
#include <vector>
#include "../SimObject.hpp"

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
    PlaceRecord(int _tokenCount) : tokens(_tokenCount) {}
};

struct TransitionRecord {
    int fired;
    TransitionRecord(int _firedCnt) : fired(_firedCnt) {}
};

#endif // __PETRINETSSTATISTICS_H__