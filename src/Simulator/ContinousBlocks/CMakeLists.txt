set(CONTINOUS_BLOCKS_HEADERS ContBlock.hpp Constant.hpp Gain.hpp Integrator.hpp Sum.hpp Div.hpp Add.hpp Sub.hpp Mul.hpp ContBlockEngine.hpp Time.hpp)
set(CONTINOUS_BLOCKS_SOURCES ContBlock.cpp Constant.cpp Gain.cpp Integrator.cpp Sum.cpp Div.cpp Add.cpp Sub.cpp Mul.cpp ContBlockEngine.cpp Time.cpp)


add_library(${CONTINOUS_BLOCK_LIB} ${CONTINOUS_BLOCKS_HEADERS} ${CONTINOUS_BLOCKS_SOURCES})
target_link_libraries(${CONTINOUS_BLOCK_LIB} ${CONTINOUS_SIMULATION_LIB} ${INTEGRATION_METHODS_LIB})