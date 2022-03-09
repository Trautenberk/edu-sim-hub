set(PETRI_NETS_SOURCES Arch.cpp Place.cpp Transition.cpp ../SimObject.cpp) 
set(PETRI_NETS_HEADERS Arch.hpp Place.hpp Transition.hpp ../SimObject.hpp)

add_library(${PETRI_NETS_LIB} ${PETRI_NETS_SOURCES} ${PETRI_NETS_HEADERS})
target_link_libraries(${PETRI_NETS_LIB} ${DISCRETE_SIMULATION_LIB})