enable_testing()

find_package(GTest COMPONENTS GTest, Main REQUIRED)


set(TEST_PROJ PetriNetsTest)
set(TEST_SOURCES mainTest.cpp TransitionTest.cpp PlaceTest.cpp ArchTest.cpp)
include_directories(${GTEST_INCLUDE_DIR})
add_executable( ${TEST_PROJ} ${TEST_SOURCES})
target_link_libraries(${TEST_PROJ} GTest::GTest GTest::Main ${PETRI_NETS_LIB})
