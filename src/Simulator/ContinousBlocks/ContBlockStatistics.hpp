#ifndef __CONTBLOCKSTATISTICS_H__
#define __CONTBLOCKSTATISTICS_H__

#include "../SimObject.hpp"
#include <map>
#include <vector>


struct IntegratorRecord {
    double value;
    IntegratorRecord(double  _value) : value(_value) {} 
};

struct ContBlockStatisticsRecord {
    double time;
    std::map<objectId, IntegratorRecord> integratorRecords;
};

struct ContBlockStatistics {
    std::vector<ContBlockStatisticsRecord> records = {};
    double simulationTime = -1;
};


#endif // __CONTBLOCKSTATISTICS_H__