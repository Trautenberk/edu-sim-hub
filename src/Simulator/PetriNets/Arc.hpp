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
class Arc;
using ArcObj = shared_ptr<Arc>;

class Arc : public PetriNetsObject {
    public:
        Arc(objectId id, PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1);
        virtual string objTypeName() = 0;
        int weight() const {return _weight;};
        shared_ptr<Place> targetPlace;
        virtual void execute() = 0;
        void initialize() { return; };
    protected:
        int _weight;
};

////////////////////////////////////////////////////////////////
class InputArc;
using InputArcObj = shared_ptr<InputArc>;

class InputArc : public Arc {
    public:
        InputArc(objectId id, PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1);
        static InputArcObj New(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1); 
        string objTypeName();
        void execute();
        int satisfied();
};


////////////////////////////////////////////////////////////////
class OutputArc;
using OutputArcObj = shared_ptr<OutputArc>;

class OutputArc : public Arc {
    public:
        OutputArc(objectId id, PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1);
        static OutputArcObj New(PetriNetsEngineObj engine, PlaceObj targetPlace, int weight = 1);
        string objTypeName();
        void execute();
};

#endif