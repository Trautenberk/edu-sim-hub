#ifndef ARCH_H
#define ARCH_H


#include "../SimObject.hpp"
#include "Place.hpp"

using namespace std;


class Arch : public SimObject {
    public:
        Arch(Place* targetPlace, int weight = 1);
        ~Arch();
        string getObjType();
        int weight() const {return _weight;};
        Place* targetPlace() const {return _targetPlace;}; 
        virtual void execute();
        void initialize(); 
    protected:
        int _weight;
        Place* _targetPlace;
};


class InputArch : public Arch {
    public:
        InputArch(Place* targetPlace, int weight = 1);
        void execute();
        bool satisfied();
};

class OutputArch : public Arch {
    public:
        OutputArch(Place* targetPlace, int weight = 1);
        void execute();
};

#endif