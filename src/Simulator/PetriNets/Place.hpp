#ifndef PLACE_H
#define PLACE_H

#include <string>
#include "PetriNetsObject.hpp"
#include <vector>
#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

using namespace std;

class Place : public PetriNetsObject {
    public :
        string label() {return _label;};
        int tokens() {return _tokens;};
        void removeTokens(int cnt);
        void addTokens(int cnt);
        Place(shared_ptr<PetriNetsEngine> engine, string label, int tokens = 0, string auxName = "");
        string objTypeName() {return "Place";};
        void initialize() {return;};
    private:
        string _label;
        int _tokens;
};

class TestClass {
    public:
        void hello() { cout << "hello from class" << endl;}
};

void bbb();


#endif