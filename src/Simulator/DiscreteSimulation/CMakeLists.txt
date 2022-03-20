set(DISCRETE_SIMULATION_SOURCES Calendar.cpp DiscreteEngine.cpp Event.cpp DiscreteSimObject.hpp)
set(DISCRETE_SIMULATION_HEADERS Calendar.hpp DiscreteEngine.hpp Event.hpp)


add_library(${DISCRETE_SIMULATION_LIB} ${DISCRETE_SIMULATION_HEADERS} ${DISCRETE_SIMULATION_SOURCES} )
target_link_libraries(${DISCRETE_SIMULATION_LIB} ${GENERATOR_LIB})