#include <string>

using namespace std;

class Token {
    public:
        int id() const { return _id;};
        Token();
    private:
        static int _cnt;
        int _id;
};