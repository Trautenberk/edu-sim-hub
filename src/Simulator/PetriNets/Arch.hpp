#ifndef ARCH_H
#define ARCH_H


#include "../SimObject.hpp"
#include "Place.hpp"

using namespace std;


class Arch : public SimObject {
    public:
        Arch(shared_ptr<Place> targetPlace, int weight = 1);
        string getObjType();
        int weight() const {return _weight;};
        shared_ptr<Place> targetPlace;
        virtual void execute();
        void initialize();
    protected:
        int _weight;
};


class InputArch : public Arch {
    public:
        InputArch(shared_ptr<Place> targetPlace, int weight = 1);
        void execute();
        bool satisfied();
};

class OutputArch : public Arch {
    public:
        OutputArch(shared_ptr<Place> targetPlace, int weight = 1);
        void execute();
};

#endif