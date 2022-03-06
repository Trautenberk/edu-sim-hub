set(PETRI_NETS_SOURCES Edge.cpp Place.cpp Transition.cpp ../SimObject.cpp) 
set(PETRI_NETS_HEADERS Edge.hpp Place.hpp Transition.hpp ../SimObject.hpp)

add_library(${PETRI_NETS_LIB} ${PETRI_NETS_SOURCES} ${PETRI_NETS_HEADERS})