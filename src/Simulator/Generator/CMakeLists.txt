add_library(${GENERATOR_LIB} Generator.cpp Generator.hpp)
set_target_properties(${GENERATOR_LIB} PROPERTIES LINKER_LANGUAGE CXX)