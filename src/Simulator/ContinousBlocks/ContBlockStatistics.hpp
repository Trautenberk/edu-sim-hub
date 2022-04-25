#ifndef __CONTBLOCKSTATISTICS_H__
#define __CONTBLOCKSTATISTICS_H__

#include "../SimObject.hpp"
#include <map>
#include <vector>


struct IntegratorRecord {
    double time;
    double value;
};


struct ContBlockStatistics {
    std::map<objectId, std::vector<IntegratorRecord>> integratorRecords = {};
    double simulationTime = -1;
};


#endif // __CONTBLOCKSTATISTICS_H__