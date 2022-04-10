set(CONTINOUS_SIMULATION_HEADERS ContinousSimObject.hpp ContinousSimEngine.hpp ../SimObject.hpp ../SimEngine.hpp)
set(CONTINOUS_SIMULATION_SOURCES ContinousSimEngine.cpp ../SimObject.cpp ../SimEngine.cpp) 


add_library(${CONTINOUS_SIMULATION_LIB} ${CONTINOUS_SIMULATION_HEADERS} ${CONTINOUS_SIMULATION_SOURCES})
set_target_properties(${CONTINOUS_SIMULATION_LIB} PROPERTIES LINKER_LANGUAGE CXX)
