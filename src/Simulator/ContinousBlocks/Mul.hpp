#ifndef __MUL_H__
#define __MUL_H__

#include "ContBlock.hpp"

/**
 * @brief Blok násobení
 * 
 */
class Mul : public ContBlockDouble {
    public:
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         */
        Mul(objectId id, ContBlockEngineObj engine);

        static ContBlockObj New(ContBlockEngineObj engine);
        static ContBlockObj New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond);

        string objTypeName();
        void eval();
        double value();
};
#endif // __MUL_H__