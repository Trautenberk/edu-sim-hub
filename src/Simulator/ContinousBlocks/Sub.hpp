#ifndef __SUB_H__
#define __SUB_H__

#include "ContBlock.hpp"

/**
 * @brief Blok odčítání
 * 
 */
class Sub : public ContBlockDouble {
    public:
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         */
        Sub(objectId id, ContBlockEngineObj engine);
        static ContBlockObj New(ContBlockEngineObj engine);
        static ContBlockObj New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond);
        string objTypeName();
        void eval();
        double value();
};
#endif // __SUB_H__