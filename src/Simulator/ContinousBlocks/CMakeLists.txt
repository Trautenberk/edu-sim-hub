

set(CONTINOUS_BLOCKS_HEADERS ContBlock.hpp Constant.hpp Gain.hpp Integrator.hpp Sum.hpp Divide.hpp)
set(CONTINOUS_BLOCKS_SOURCES ContBlock.cpp Constant.cpp Gain.cpp Integrator.cpp Sum.cpp Divide.cpp)

add_library(${CONTINOUS_BLOCK_LIB} ${CONTINOUS_BLOCKS_HEADERS} ${CONTINOUS_BLOCKS_SOURCES})
target_link_libraries(${CONTINOUS_BLOCK_LIB} ${CONTINOUS_SIMULATION_LIB})