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
#include "chrono/physics/ChLinkMotorRotationSpeed.h"
#include "chrono/assets/ChTexture.h"
#include "chrono/core/ChRealtimeStep.h"
 
#ifdef CHRONO_COLLISION
    #include "chrono/collision/chrono/ChCollisionSystemChrono.h"
#endif


// Use the namespace of Chrono
using namespace chrono;
ChCollisionSystemType collision_type = ChCollisionSystemType::BULLET;

template <typename BodyType>
std::string addNextFrame(const BodyType& body) {
    std::string s = "";
    chrono::ChVector<double> curr = body->GetPos();
    chrono::ChQuaternion<double> rot = body->GetRot();
    double my_e0 = static_cast<double>(rot.e0());
    double my_e1 = static_cast<double>(rot.e1());
    double my_e2 = static_cast<double>(rot.e2());
    double my_e3 = static_cast<double>(rot.e3());
    
    s += std::to_string(curr.x()) + ",";
    s += std::to_string(curr.y()) + ",";
    s += std::to_string(curr.z()) + ",";
    s += std::to_string(my_e0) + ",";
    s += std::to_string(my_e1) + ",";
    s += std::to_string(my_e2) + ",";
    s += std::to_string(my_e3) + "\n";

    return s;
}

void saveStringToFile(std::string s, std::string fileName) {
    std::ofstream outputFile(fileName);
    if (outputFile.is_open()) {
        outputFile << s;
        outputFile.close();
    }
}

int main(int argc, char* argv[]) {
    // Set path to Chrono data directory
    SetChronoDataPath(CHRONO_DATA_DIR);


    chrono::ChSystemNSC sys;
    sys.SetCollisionSystemType(collision_type);
 
    // Settings specific to Chrono multicore collision system
    if (collision_type == ChCollisionSystemType::CHRONO) {
#ifdef CHRONO_COLLISION
        auto collsys = std::static_pointer_cast<ChCollisionSystemChrono>(sys.GetCollisionSystem());
        // Change the default number of broadphase bins
        collsys->SetBroadphaseGridResolution(ChVector<int>(10, 10, 2));
        // Change default narrowphase algorithm
        collsys->SetEnvelope(0.005);
        // Enable active bounding box
        collsys->EnableActiveBoundingBox(ChVector<>(-10, -10, -20), ChVector<>(+10, +10, +10));
        // Set number of threads used by the collision detection system
        collsys->SetNumThreads(4);
#endif
    }

    auto ground_mat = chrono_types::make_shared<ChMaterialSurfaceNSC>();
    auto ground_mat_vis = chrono_types::make_shared<ChVisualMaterial>(*ChVisualMaterial::Default());
    ground_mat_vis->SetKdTexture(GetChronoDataFile("textures/concrete.jpg"));
 
    // Create the five walls of the rectangular container, using fixed rigid bodies of 'box' type
    auto floorBody = chrono_types::make_shared<ChBodyEasyBox>(20, 1, 20, 1000, ground_mat, collision_type);
    floorBody->SetPos(ChVector<>(0, -5, 0));
    floorBody->SetBodyFixed(true);
    floorBody->GetVisualShape(0)->SetMaterial(0, ground_mat_vis);
    sys.Add(floorBody);

    auto box_mat = chrono_types::make_shared<ChMaterialSurfaceNSC>();
    auto boxBody = chrono_types::make_shared<ChBodyEasyBox>(1.5, 1.5, 1.5,  // x,y,z size
                                                            100,            // density
                                                            box_mat,        // contact material
                                                            collision_type);
    boxBody->SetPos(ChVector<>(0, 1.7, 0));
    boxBody->SetWvel_loc(ChVector<>(1, 1, 0));

    sys.Add(boxBody);





    int cnt = 500;
    std::string s;
    s.reserve(1000000);
    std::string s2;
    s2.reserve(1000000);
    while (cnt-- > 0) {
        // Perform the integration stpe
        if (cnt <500 && cnt >= 0) {
            //boxBody->Accumulate_force(chrono::ChVector<>(250.0*cos(cnt*0.15), 0, 0), boxBody->GetPos(), false);
        }
        sys.DoStepDynamics(0.01666667);
        s += addNextFrame(boxBody);
        if (cnt % 100== 0) {
            std::cout << "iters left; " << cnt << std::endl;
        }

    }
    saveStringToFile(s, "../public/assets/text/output.txt");
    //saveStringToFile(s2, "../public/assets/text/output2.txt");
    std::cout << "done" << std::endl;
    return 0;
}


