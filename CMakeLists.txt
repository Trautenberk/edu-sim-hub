cmake_minimum_required(VERSION 3.0.0)
project(wasm_Simulator VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_VERBOSE_MAKEFILE ON)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR})
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)

add_subdirectory(src/Simulator)


if (${CMAKE_SYSTEM_NAME} MATCHES "Emscripten")
    set_target_properties(${PROJECT_NAME} PROPERTIES SUFFIX ".js")
    set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS "--bind -s WASM=1 -s MODULARIZE=1 -s EXPORT_ES6=1 -s SINGLE_FILE=1 -s EXPORT_NAME=TestModule -s USE_ES6_IMPORT_META=0 -s ENVIRONMENT='web'")
endif()

