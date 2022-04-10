#ifndef ARCH_H
#define ARCH_H


#include "PetriNetsObject.hpp"
#include "Place.hpp"
#include <iostream>
#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

using namespace std;


class Arch : public PetriNetsObject {
    public:
        Arch(shared_ptr<PetriNetsEngine> engine, shared_ptr<Place> targetPlace, int weight = 1, string auxName = "");
        virtual string objTypeName() = 0;
        int weight() const {return _weight;};
        shared_ptr<Place> targetPlace;
        virtual void execute() = 0;
        void initialize() { return; };
        void gatherStatistics() {};     
    protected:
        int _weight;
};


class InputArch : public Arch {
    public:
        InputArch(PNObj<PetriNetsEngine> engine, PNObj<Place> targetPlace, int weight = 1, string auxName = "");
        static PNObj<InputArch> New(PNObj<PetriNetsEngine> engine, PNObj<Place> targetPlace, int weight = 1, string auxName = ""); 
        string objTypeName() {return "InputArch";};
        void execute();
        int satisfied();
};

class OutputArch : public Arch {
    public:
        OutputArch(PNObj<PetriNetsEngine> engine, PNObj<Place> targetPlace, int weight = 1, string auxName = "");
        static PNObj<OutputArch> New(PNObj<PetriNetsEngine> engine, PNObj<Place> targetPlace, int weight = 1, string auxName = "");
        string objTypeName() {return "OutputArch";};
        void execute();
};

#endif