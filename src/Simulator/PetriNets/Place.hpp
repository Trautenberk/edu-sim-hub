#include <string>
#include "../SimObject.hpp"

using namespace std;

class Place : SimObject{
    public :
        string label;
    
        Place();
        ~Place();
        string getObjType();
};

