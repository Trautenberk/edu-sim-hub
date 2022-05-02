set(PETRI_NETS_SOURCES Arc.cpp Place.cpp Transition.cpp PetriNetsEngine.hpp PetriNetsObject.hpp PetriNetsStatistics.hpp) 
set(PETRI_NETS_HEADERS Arc.hpp Place.hpp Transition.hpp PetriNetsEngine.cpp PetriNetsObject.cpp )

add_library(${PETRI_NETS_LIB} ${PETRI_NETS_SOURCES} ${PETRI_NETS_HEADERS})
target_link_libraries(${PETRI_NETS_LIB} ${DISCRETE_SIMULATION_LIB})