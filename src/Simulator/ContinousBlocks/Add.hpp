#ifndef __ADD_H__
#define __ADD_H__

#include "ContBlock.hpp"

/** 
 * @brief Blok sčítání
 * 
 */
class Add : public ContBlockDouble {
    public:

        /**
         * @brief Konstruktor Add bloku
         * 
         * @param id identifikátor 
         * @param engine objekt simulačního enginu
         */
        Add(objectId id, ContBlockEngineObj engine);
        /**
         * @brief Pomocná funkce pro konstrukci objektu
         * 
         * @param engine 
         * @return ContBlockObj 
         */
        static ContBlockObj New(ContBlockEngineObj engine);
        /**
         * @brief Pomocná funkce pro konstrukci objektu s parametry
         * 
         * @param engine 
         * @param inputFirst 
         * @param inputSecond 
         * @return ContBlockObj 
         */
        static ContBlockObj New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond);

        /**
         * @brief Vrací součet vstupních bloků
         * 
         * @return double 
         */
        double value();
        void eval() override;
        string objTypeName();
};

#endif // __ADD_H__