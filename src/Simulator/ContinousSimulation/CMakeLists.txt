set(ContinousSimulationHeaders ContinousSimObject.hpp ContinousSimulator.hpp )
set(ContinousSimulationSources ContinousSimulator.cpp) 

add_library(${CONTINOUS_SIMULATION_LIB} ${ContinousSimulationHeaders} ${ConinoSimulationSources})
set_target_properties(${CONTINOUS_SIMULATION_LIB} PROPERTIES LINKER_LANGUAGE CXX)
