#include <string>

using namespace std;

 class SimObject {

    private:
        static int _objCounter;
    public: 
        string id;
        SimObject();
        virtual string getObjType();
};


// EMSCRIPTEN_BINDINGS(SimObject) {
//     class<SimObject>("SimObject")
//     .constructor<>()
//     .property("id", &SimObject::id)
//     .function("getObjType");
// }