enable_testing()

find_package(GTest COMPONENTS GTest, Main REQUIRED)


set(TEST_PROJ tests)
include_directories(${GTEST_INCLUDE_DIR})
add_executable( ${TEST_PROJ} hello_test.cpp)
target_link_libraries(${TEST_PROJ} GTest::GTest GTest::Main)
