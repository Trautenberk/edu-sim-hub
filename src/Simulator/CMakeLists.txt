
set(PETRI_NETS_LIB PetriNets_lib)
set(DISCRETE_SIMULATION_LIB DiscreteSimulation_lib)
set(GENERATOR_LIB Generator_lib)

if (NOT (${CMAKE_SYSTEM_NAME} MATCHES "Emscripten"))
    set(CMAKE_CXX_STANDARD 17)
    cmake_minimum_required(VERSION 3.0.0)
    set(CMAKE_VERBOSE_MAKEFILE ON)    
    project(Simulator)
    add_compile_options(-g)
    add_subdirectory(UnitTests)
endif()


add_subdirectory(PetriNets)
add_subdirectory(DiscreteSimulation)
add_subdirectory(Generator)

add_executable(${PROJECT_NAME} main.cpp)


target_link_libraries(${PROJECT_NAME} ${PETRI_NETS_LIB} ${DISCRETE_SIMULATION_LIB}) 