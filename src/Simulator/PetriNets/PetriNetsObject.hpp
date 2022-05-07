#ifndef PETRI_NETS_OBJECTS_H
#define PETRI_NETS_OBJECTS_H

#include "../SimObject.hpp"
#include "PetriNetsEngine.hpp"

/**
 * @brief Element Petriho Sítě
 * 
 */
class PetriNetsObject : public SimObject {
    public:
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         */
        PetriNetsObject(objectId id, PetriNetsEngineObj engine);
        PetriNetsEngineObj engine;
};

#endif