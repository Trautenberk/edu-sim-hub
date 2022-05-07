#ifndef __CONTBLOCK_H__
#define __CONTBLOCK_H__

#include "../SimObject.hpp"
#include <memory>
#include <vector>
#include "ContBlockEngine.hpp"

class ContBlock;

using ContBlockObj = std::shared_ptr<ContBlock>;


/**
 * @brief Spojitý blok
 * 
 */
class ContBlock : public SimObject {
    public:
        /**
         * @brief Konstruktor spojitého bloku
         * 
         * @param id 
         * @param engine 
         */
        ContBlock(objectId id, ContBlockEngineObj engine);
        /**
         * @brief Vrací současnou hodnotu bloku
         * 
         * @return double 
         */
        virtual double value() = 0;
        /**
         * @brief Provede načtení vstupů, pokud je potřeba
         * 
         */
        virtual void eval() = 0;
        /**
         * @brief Sdílený ukazatel na objekt simualčního engine
         * 
         */
        ContBlockEngineObj engine;
        /**
         * @brief Inicializační funkce volaná před provedením simulace
         * 
         */
        void initialize() override;
};

/**
 * @brief Spojitý blok s jedním vstupem
 * 
 */
class ContBlockSingle : public ContBlock {
    public: 
        /**
         * @brief Konstruktor 
         * 
         * @param engine 
         */
        ContBlockSingle(objectId, ContBlockEngineObj engine);
        /**
         * @brief Nastaví vstupní blok
         * 
         * @param input 
         */
        void setInput(ContBlockObj input);
        void initialize() override;

    protected:
        /** vstupní blok */
        ContBlockObj _input = nullptr;
};

using ContBlockSingleObj = shared_ptr<ContBlockSingle>;

/**
 * @brief Spojitý blok s dvěma vstupy
 * 
 */
class ContBlockDouble : public ContBlock {
    public:
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         */
        ContBlockDouble(objectId id, ContBlockEngineObj engine);
        /**
         * @brief Nastaví oba vstupní bloky
         * 
         * @param inputFirst První vstupní blok
         * @param inputSecond Druhý vstupní blok
         */
        void setInputs(ContBlockObj inputFirst, ContBlockObj inputSecond);
        /**
         * @brief Nastaví první vstupní blok
         * 
         * @param inputFirst 
         */
        void setInputFirst(ContBlockObj inputFirst);
        /**
         * @brief Nastaví druhý vstupní blok
         * 
         * @param inputSecond 
         */
        void setInputSecond(ContBlockObj inputSecond);
        void initialize() override;

    protected:
        // První vstupní blok
        ContBlockObj _inputFirst = nullptr;
        // Druhý vstuní blok
        ContBlockObj _inputSecond = nullptr;
};

using ContBlockDoubleObj = shared_ptr<ContBlockDouble>;

/**
 * @brief Spojitý blok s vícero vstupy
 * 
 */
class ContBlockMulti : public ContBlock {
    public:
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         */
        ContBlockMulti(objectId id, ContBlockEngineObj engine); 
        /**
         * @brief Hromadně nastaví vstupy
         * 
         * @param inputs 
         */
        void setInputs(vector<ContBlockObj> inputs);

    protected:
        // Kolekce vstupních bloků
        std::vector<ContBlockObj> _inputs = {};
};

#endif // __CONTBLOCK_H__