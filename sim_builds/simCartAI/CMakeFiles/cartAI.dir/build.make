# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.22

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/james/Documents/Projects/cart-pole/simCartAI

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/james/Documents/Projects/cart-pole/sim_builds/simCartAI

# Include any dependencies generated for this target.
include CMakeFiles/cartAI.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/cartAI.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/cartAI.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/cartAI.dir/flags.make

CMakeFiles/cartAI.dir/cartAI.cpp.o: CMakeFiles/cartAI.dir/flags.make
CMakeFiles/cartAI.dir/cartAI.cpp.o: /home/james/Documents/Projects/cart-pole/simCartAI/cartAI.cpp
CMakeFiles/cartAI.dir/cartAI.cpp.o: CMakeFiles/cartAI.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/james/Documents/Projects/cart-pole/sim_builds/simCartAI/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/cartAI.dir/cartAI.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/cartAI.dir/cartAI.cpp.o -MF CMakeFiles/cartAI.dir/cartAI.cpp.o.d -o CMakeFiles/cartAI.dir/cartAI.cpp.o -c /home/james/Documents/Projects/cart-pole/simCartAI/cartAI.cpp

CMakeFiles/cartAI.dir/cartAI.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/cartAI.dir/cartAI.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/james/Documents/Projects/cart-pole/simCartAI/cartAI.cpp > CMakeFiles/cartAI.dir/cartAI.cpp.i

CMakeFiles/cartAI.dir/cartAI.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/cartAI.dir/cartAI.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/james/Documents/Projects/cart-pole/simCartAI/cartAI.cpp -o CMakeFiles/cartAI.dir/cartAI.cpp.s

CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.o: CMakeFiles/cartAI.dir/flags.make
CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.o: /home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp
CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.o: CMakeFiles/cartAI.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/james/Documents/Projects/cart-pole/sim_builds/simCartAI/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.o -MF CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.o.d -o CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.o -c /home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp

CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp > CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.i

CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp -o CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.s

CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.o: CMakeFiles/cartAI.dir/flags.make
CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.o: /home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp
CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.o: CMakeFiles/cartAI.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/james/Documents/Projects/cart-pole/sim_builds/simCartAI/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building CXX object CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.o -MF CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.o.d -o CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.o -c /home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp

CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp > CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.i

CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp -o CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.s

# Object files for target cartAI
cartAI_OBJECTS = \
"CMakeFiles/cartAI.dir/cartAI.cpp.o" \
"CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.o" \
"CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.o"

# External object files for target cartAI
cartAI_EXTERNAL_OBJECTS =

cartAI: CMakeFiles/cartAI.dir/cartAI.cpp.o
cartAI: CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/load_nn.cpp.o
cartAI: CMakeFiles/cartAI.dir/home/james/Documents/Projects/cart-pole/libraries/my_cpp/my_utils.cpp.o
cartAI: CMakeFiles/cartAI.dir/build.make
cartAI: /usr/lib/gcc/x86_64-linux-gnu/11/libgomp.so
cartAI: /usr/lib/x86_64-linux-gnu/libpthread.a
cartAI: /home/james/Documents/Projects/cart-pole/chrono_build/lib/libChronoModels_robot.so
cartAI: /home/james/Documents/Projects/cart-pole/chrono_build/lib/libChronoEngine.so
cartAI: CMakeFiles/cartAI.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/james/Documents/Projects/cart-pole/sim_builds/simCartAI/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Linking CXX executable cartAI"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/cartAI.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/cartAI.dir/build: cartAI
.PHONY : CMakeFiles/cartAI.dir/build

CMakeFiles/cartAI.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/cartAI.dir/cmake_clean.cmake
.PHONY : CMakeFiles/cartAI.dir/clean

CMakeFiles/cartAI.dir/depend:
	cd /home/james/Documents/Projects/cart-pole/sim_builds/simCartAI && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/james/Documents/Projects/cart-pole/simCartAI /home/james/Documents/Projects/cart-pole/simCartAI /home/james/Documents/Projects/cart-pole/sim_builds/simCartAI /home/james/Documents/Projects/cart-pole/sim_builds/simCartAI /home/james/Documents/Projects/cart-pole/sim_builds/simCartAI/CMakeFiles/cartAI.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/cartAI.dir/depend

