#ifndef PLACE_H
#define PLACE_H

#include <string>
#include "PetriNetsObject.hpp"
#include <vector>

using namespace std;


class Place : public PetriNetsObject {
    public :
        string label() {return _label;};
        int tokens() {return _tokens;};
        void removeTokens(int cnt);
        void addTokens(int cnt);
        Place(shared_ptr<PetriNetsEngine> engine, string label, int tokens = 0);
        string getObjType();
        void initialize() {return;};
    private:
        string _label;
        int _tokens;
};

#endif