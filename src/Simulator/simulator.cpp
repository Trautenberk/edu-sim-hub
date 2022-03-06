#include "iostream"
#include <emscripten/bind.h>


using namespace emscripten;

int test(){
    std::cout << "Hello, from WASM-Simulator!\n";
    return 12;
}

EMSCRIPTEN_BINDINGS(my_module) {
    function("test", &test);
}
