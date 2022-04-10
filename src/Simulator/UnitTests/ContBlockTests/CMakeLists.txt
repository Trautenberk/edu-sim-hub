enable_testing()

set(CONT_BLOCK_TEST_PROJ ContBlockTest)

find_package(GTest COMPONENTS GTest, Main REQUIRED)
set (CONT_BLOCK_TEST_SOURCES EulerTest.cpp SimpleSimTests.cpp ContBlockTests.cpp)
include_directories(${GTEST_INCLUDE_DIR})
add_executable(${CONT_BLOCK_TEST_PROJ} ${CONT_BLOCK_TEST_SOURCES})
target_link_libraries(${CONT_BLOCK_TEST_PROJ} GTest::GTest GTest::Main ${CONTINOUS_BLOCK_LIB})
