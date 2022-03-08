#ifndef ARCH_H
#define ARCH_H


#include "../SimObject.hpp"
#include "Place.hpp"

using namespace std;


class Arch : SimObject {
    public:
        Arch(Place* targetPlace, int weight = 1);
        ~Arch();
        string getObjType();
        int weight() const {return _weight;};
        Place* targetPlace() const {return _targetPlace;}; 
        virtual void execute(); 
    protected:
        int _weight;
        Place* _targetPlace;
};


class InputArch : Arch {
    public:
        void execute();
        bool satisfied();
};

class OutputArch : Arch {
    public:
        void execute();
};

#endif