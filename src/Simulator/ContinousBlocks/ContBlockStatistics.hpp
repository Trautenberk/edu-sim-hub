#ifndef __CONTBLOCKSTATISTICS_H__
#define __CONTBLOCKSTATISTICS_H__

#include "../SimObject.hpp"
#include <map>
#include <vector>

/**
 * @brief Záznam statistik pro integrátor
 */
struct IntegratorRecord {
    double time;
    double value;
};

/**
 * @brief Statistiky simulace spojitého blokového schéma.
 * 
 */
struct ContBlockStatistics {
    /**
     * @brief Mapa objketů a jejich záznamů statistik
     */
    std::map<objectId, std::vector<IntegratorRecord>> integratorRecords = {};
    /**
     * @brief Simulační čas
     */
    double simulationTime = -1;
};


#endif // __CONTBLOCKSTATISTICS_H__