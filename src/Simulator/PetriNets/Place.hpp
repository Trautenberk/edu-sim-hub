#ifndef PLACE_H
#define PLACE_H

#include <string>
#include "../SimObject.hpp"

using namespace std;

class Place : public SimObject {
    public :
        string label() {return _label;};
        int tokens() {return _tokens;};
        void removeTokens(int cnt);
        void addTokens(int cnt);
        Place(string label, int tokens = 0);
        ~Place();
        string getObjType();
    private:
        string _label;
        int _tokens;
};

#endif