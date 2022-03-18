#ifndef ARCH_H
#define ARCH_H


#include "PetriNetsObject.hpp"
#include "Place.hpp"
#include <iostream>

using namespace std;


class Arch : public PetriNetsObject {
    public:
        Arch(shared_ptr<Place> targetPlace, int weight = 1);
        string getObjType();
        int weight() const {return _weight;};
        shared_ptr<Place> targetPlace;
        virtual void execute() = 0;
        void initialize() { return; };
    protected:
        int _weight;
};


class InputArch : public Arch {
    public:
        InputArch(shared_ptr<Place> targetPlace, int weight = 1);
        void execute();
        int satisfied();
};

class OutputArch : public Arch {
    public:
        OutputArch(shared_ptr<Place> targetPlace, int weight = 1);
        void execute();
};

#endif