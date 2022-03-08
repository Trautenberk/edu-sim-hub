#include "../SimObject.hpp"
#include "Place.hpp"

using namespace std;


class Arch : SimObject {
    public:
        enum ArchType { input, output };
        Arch(ArchType archType, int weight, Place& targetPlace);
        ~Arch();
        string getObjType();
        int weight() const {return _weight;}; // váha přechodu
        ArchType archType() const {return _archType;}; // typ přechodu
        Place& targetPlace() const {return _targetPlace;}; 
        void execute(); 
    private:
        int _weight;
        Arch::ArchType _archType;
        Place& _targetPlace;
};