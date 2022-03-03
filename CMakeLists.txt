cmake_minimum_required(VERSION 3.0.0)
project(Simulator VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 11)
set(SIMULATOR_LIB_NAME Simulator_Lib)
set(CMAKE_VERBOSE_MAKEFILE ON)


add_executable(${PROJECT_NAME} simulator.cpp)
link_libraries(${PROJECT_NAME} ${SIMULATOR_LIB_NAME})


set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS "-s -lembind -s WASM=1 -s MODULARIZE=1 -s EXPORT_ES6=1 -s EXPORT_NAME=TestModule -s USE_ES6_IMPORT_META=0  -s ENVIRONMENT='web'")

