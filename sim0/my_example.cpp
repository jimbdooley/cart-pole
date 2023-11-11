// =============================================================================
// PROJECT CHRONO - http://projectchrono.org
//
// Copyright (c) 2014 projectchrono.org
// All rights reserved.
//
// Use of this source code is governed by a BSD-style license that can be found
// in the LICENSE file at the top level of the distribution and at
// http://projectchrono.org/license-chrono.txt.
//
// =============================================================================
// A very simple example that can be used as template project for
// a Chrono::Engine simulator with 3D view.
// =============================================================================

#include "chrono/physics/ChSystemNSC.h"
#include "chrono/physics/ChBodyEasy.h"
#include "chrono/physics/ChLinkMate.h"
#include "chrono/core/ChRealtimeStep.h"


// Use the namespace of Chrono
using namespace chrono;

int main(int argc, char* argv[]) {
    // Set path to Chrono data directory
    SetChronoDataPath(CHRONO_DATA_DIR);
    
    // Create a Chrono physical system
    ChSystemNSC sys;


    // Pendulum example ------------------------------------

    // 1 - Create a floor that is fixed (that is used also to represent the absolute reference)

    auto floorBody = std::make_shared<ChBodyEasyBox>(10, 2, 10,  // x, y, z dimensions
                                                     3000,       // density
                                                     true,       // create visualization asset
                                                     false       // no collision geometry
                                                     );
    floorBody->SetPos(ChVector<>(0, -2, 0));
    floorBody->SetBodyFixed(true);

    sys.Add(floorBody);

    // 2 - Create a pendulum

    auto pendulumBody = std::make_shared<ChBodyEasyBox>(0.5, 2, 0.5,  // x, y, z dimensions
                                                        3000,         // density
                                                        true,         // create visualization asset
                                                        false         // no collision geometry
                                                        );
    pendulumBody->SetPos(ChVector<>(0, 3, 0));
    pendulumBody->SetPos_dt(ChVector<>(1, 0, 0));

    sys.Add(pendulumBody);

    // 3 - Create a spherical constraint.
    //   Here we'll use a ChLinkMateGeneric, but we could also use ChLinkLockSpherical

    auto sphericalLink =
        std::make_shared<ChLinkMateGeneric>(true, true, true, false, false, false);  // x,y,z,Rx,Ry,Rz constrains
    ChFrame<> link_position_abs(ChVector<>(0, 4, 0));

    sphericalLink->Initialize(pendulumBody,        // the 1st body to connect
                              floorBody,           // the 2nd body to connect
                              false,               // the two following frames are in absolute, not relative, coords.
                              link_position_abs,   // the link reference attached to 1st body
                              link_position_abs);  // the link reference attached to 2nd body

    sys.Add(sphericalLink);


    // 5 - Simulation loop
    ChRealtimeStepTimer realtime_timer;
    double step_size = 0.001666667;

    int cnt = 5001;
    std::string s = "";
    while (cnt-- > 0) {
        // Perform the integration stpe
        sys.DoStepDynamics(step_size);
        if (cnt % 10 == 0) {
            ChVector<double> curr = pendulumBody->GetPos();
            ChQuaternion< double > rot = pendulumBody->GetRot();
            double my_e0 = (double)rot.e0();
            double my_e1 = (double)rot.e1();
            double my_e2 = (double)rot.e2();
            double my_e3 = (double)rot.e3();
            s += std::to_string(curr.x()) + ",";
            s += std::to_string(curr.y()) + ",";
            s += std::to_string(curr.z()) + ",";
            s += std::to_string(my_e0) + ",";
            s += std::to_string(my_e1) + ",";
            s += std::to_string(my_e2) + ",";
            s += std::to_string(my_e3) + "\n";
        }

        // Spin in place to maintain soft real-time
        realtime_timer.Spin(step_size);
    }
    std::ofstream outputFile("output.txt");
    if (outputFile.is_open()) {
        outputFile << s;
        outputFile.close();
    }
    std::cout << "done" << std::endl;
    return 0;
}
