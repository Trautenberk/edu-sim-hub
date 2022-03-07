
set(PETRI_NETS_LIB PetriNets_lib)
set(DISCRETE_SIMULATION_LIB DiscreteSimulation_lib)

add_subdirectory(PetriNets)
add_subdirectory(DiscreteSimulation)

add_executable(${PROJECT_NAME} simulator.cpp)

target_link_libraries(${PROJECT_NAME} ${PETRI_NETS_LIB})