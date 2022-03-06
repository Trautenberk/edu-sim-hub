
set(PETRI_NETS_LIB PetriNets_lib)

add_subdirectory(PetriNets)

add_executable(${PROJECT_NAME} simulator.cpp)

target_link_libraries(${PROJECT_NAME} ${PETRI_NETS_LIB})