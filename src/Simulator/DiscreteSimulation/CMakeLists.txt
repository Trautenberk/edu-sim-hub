set(DISCRETE_SIMULATION_SOURCES Calendar.cpp DiscreteEngine.cpp Event.cpp ../SimObject.hpp ../SimEngine.hpp)
set(DISCRETE_SIMULATION_HEADERS Calendar.hpp DiscreteEngine.hpp Event.hpp ../SimObject.cpp ../SimEngine.cpp)


add_library(${DISCRETE_SIMULATION_LIB} ${DISCRETE_SIMULATION_HEADERS} ${DISCRETE_SIMULATION_SOURCES} )
target_link_libraries(${DISCRETE_SIMULATION_LIB} ${GENERATOR_LIB})