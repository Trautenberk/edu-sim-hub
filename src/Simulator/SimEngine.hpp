#ifndef __SIMENGINE_H__
#define __SIMENGINE_H__

#include <functional>
#include <vector>
#include <memory>

#ifdef EMSCRIPTEN
    #include "emscripten/bind.h"
#endif

class SimObject;
class SimEngine;


using SimEngineObj = std::shared_ptr<SimEngine>;

/**
 * @brief Abstraktní třída simulačního enginu
 * 
 */
class SimEngine {
    public:
        /**
         * @brief Getter modelového času
         * 
         * @return double 
         */
        double time();
        /**
         * @brief Getter koncového času modelu
         * 
         * @return double 
         */
        double endTime();
        virtual void simulate() = 0;
        /**
         * @brief Přidá ukazatel na objekt modelu do interní kolekce
         * 
         * @param object 
         */
        void addObject(SimObject* object);
        std::function<void(void)> Sample = [](){};
    protected:
        // Koncový čas simulace
        double _endTime = 0.0;
        // Modelový čas
        double _time = 0.0;
        // Interní kolekce všech objektů modelu
        std::vector<SimObject*> _simObjects = {};



};

#endif // __SIMENGINE_H__