#ifndef __CONSTANT_H__
#define __CONSTANT_H__

#include "ContBlock.hpp"
#include <memory>

using namespace std;

/**
 * @brief Blok konstanty
 * 
 */
class Constant : public ContBlock
{
    public:
        /**
         * @brief Konstruktor bloku konstatny
         * 
         * @param id identifikátor 
         * @param engine objekt simulačního enginu
         * @param value hodnota
         */
        Constant(objectId id, ContBlockEngineObj engine, double value);
        static ContBlockObj New(ContBlockEngineObj engine, double value);
        /**
         * @brief Vrací konstantní hodnotu
         * 
         * @return double 
         */
        double value();
        void eval();
        string objTypeName();
    private: 
        double _value;
};


#endif // __CONSTANT_H__