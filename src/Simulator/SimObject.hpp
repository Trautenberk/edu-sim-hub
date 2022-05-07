#ifndef SIMOBJECT_H
#define SIMOBJECT_H

#include <string>
#include "SimEngine.hpp"


using objectId = std::string;

class SimEngine;


/**
 * @brief Abstraktní třída pro objekty modelu. 
 */
 class SimObject {

    private:
        /**
         * @brief Počítadlo pro generování identifikátorů 
         */
        static int _objCounter;
    public:
        /**
         * @brief Konstruktor
         * 
         * @param id 
         */
        SimObject(objectId id);
        /**
         * @brief Statická třída pro generování identifikátorů.
         *  Primárně se uvažuje že id vytvoří editor.
         * 
         * @param objectType 
         * @return std::string 
         */
        static std::string createId(std::string objectType);
        /**
         * @brief Getter identifikátoru
         * 
         * @return const objectId 
         */
        const objectId id();
        virtual std::string objTypeName() = 0;
        virtual void initialize() = 0;
    private:
        // identifikátor objektu
        objectId _id;
};


// EMSCRIPTEN_BINDINGS(SimObject) {
//     class<SimObject>("SimObject")
//     .constructor<>()
//     .property("id", &SimObject::id)
//     .function("getObjType");
// }

#endif