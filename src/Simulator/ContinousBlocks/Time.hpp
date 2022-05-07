#ifndef __TIME_H__
#define __TIME_H__

#include "ContBlock.hpp"

/**
 * @brief Blok času
 * 
 */
class Time : public ContBlock {
    public:
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         */
        Time(objectId id, ContBlockEngineObj engine);
        static ContBlockObj New(ContBlockEngineObj engine);
        void eval();
        double value();
        string objTypeName();
};

#endif // __TIME_H__