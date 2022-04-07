#ifndef __PETRINETSSTATISTICS_H__
#define __PETRINETSSTATISTICS_H__

#include <map>
#include <tuple>
#include <queue>
#include <vector>

class Transition;
class Place;
struct PlaceRecord;
struct TransitionRecord;

class PetriNetsStatistics {
    public:
        std::vector<double> recordTimes = {};
        std::map<int, queue<PlaceRecord>> placeRecords = {};
        std::map<int, queue<TransitionRecord>> transitionRecords = {};
};

struct PlaceRecord  {
    int tokenCount;
    PlaceRecord(int _tokenCount) : tokenCount(_tokenCount) {}
};

struct TransitionRecord {
    int firedCnt;
    TransitionRecord(int _firedCnt) : firedCnt(_firedCnt) {}
};

#endif // __PETRINETSSTATISTICS_H__