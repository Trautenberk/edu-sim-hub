#include <string>
#include "../SimObject.hpp"

using namespace std;

class Place : SimObject{
    public :
        string label() {return _label;};
        int tokens() {return _tokens;};
        void removeTokens(int cnt);
        void addTokens(int cnt);
        Place(string label, int tokens);
        ~Place();
        string getObjType();
    private:
        string _label;
        int _tokens;
};

