cmake_minimum_required(VERSION 3.0.0)
project(WASM-Simulator VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 11)
set(SIMULATOR_LIB_NAME Simulator_Lib)

add_subdirectory(src)
add_executable(${PROJECT_NAME} WASM-Simulator.cpp)
link_libraries(${PROJECT_NAME} ${SIMULATOR_LIB_NAME})

