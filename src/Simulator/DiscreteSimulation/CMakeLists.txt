set(DISCRETE_SIMULATION_SOURCES Calendar.cpp DiscreteSimulationEngine.cpp Event.cpp)
set(DISCRETE_SIMULATION_HEADERS Calendar.hpp DiscreteSimulationEngine.hpp Event.hpp)


add_library(${DISCRETE_SIMULATION_LIB} ${DISCRETE_SIMULATION_HEADERS} ${DISCRETE_SIMULATION_SOURCES})