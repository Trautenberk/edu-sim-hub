#ifndef PLACE_H
#define PLACE_H

#include <string>
#include "PetriNetsObject.hpp"
#include <vector>
#include "PetriNetsStatistics.hpp"

#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

using namespace std;

using PlaceObj = shared_ptr<Place>;

/**
 * @brief Místo Petriho sítě.
 * 
 */
class Place : public PetriNetsObject {
    public :
        /**
         * @brief Konstruktor
         * 
         * @param id 
         * @param engine 
         * @param tokens 
         */
        Place(objectId id, PetriNetsEngineObj engine, int tokens = 0);
        static PlaceObj New(PetriNetsEngineObj engine, int tokens = 0);

        /**
         * @brief Getter tokenů
         * 
         * @return int 
         */
        int tokens() { return _tokens; };
        /**
         * @brief Metoda pro odebrání tokenů z místa
         * 
         * @param cnt 
         */
        void removeTokens(int cnt);
        /**
         * @brief Metoda pro přidání tokenů do místa
         * 
         * @param cnt 
         */
        void addTokens(int cnt);
        string objTypeName();
        /**
         * @brief Inicializační funkce
         * 
         */
        void initialize() { return; };
        /**
         * @brief Metoda pro vytvoření záznamu do statistik pro daný časový okamžik
         * 
         * @return PlaceRecord 
         */
        PlaceRecord getStatisticsRecord();
    private:
        int _tokens;
};


#endif