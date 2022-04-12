#ifndef ARCH_H
#define ARCH_H


#include "PetriNetsObject.hpp"
#include "Place.hpp"
#include <iostream>
#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

using namespace std;

////////////////////////////////////////////////////////////////
class Arch;
using ArchObj = shared_ptr<Arch>;

class Arch : public PetriNetsObject {
    public:
        Arch(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1, string auxName = "");
        virtual string objTypeName() = 0;
        int weight() const {return _weight;};
        shared_ptr<Place> targetPlace;
        virtual void execute() = 0;
        void initialize() { return; };
    protected:
        int _weight;
};

////////////////////////////////////////////////////////////////
class InputArch;
using InputArchObj = shared_ptr<InputArch>;

class InputArch : public Arch {
    public:
        InputArch(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1, string auxName = "");
        static InputArchObj New(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1, string auxName = ""); 
        string objTypeName() {return "InputArch";};
        void execute();
        int satisfied();
};


////////////////////////////////////////////////////////////////
class OutputArch;
using OutputArchObj = shared_ptr<OutputArch>;

class OutputArch : public Arch {
    public:
        OutputArch(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1, string auxName = "");
        static OutputArchObj New(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1, string auxName = "");
        string objTypeName() {return "OutputArch";};
        void execute();
};

#endif