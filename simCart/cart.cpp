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
// a Engine simulator with 3D view.
// =============================================================================

#include "chrono/physics/ChSystemNSC.h"
#include "chrono/physics/ChBodyEasy.h"
#include "chrono/physics/ChLinkMotorRotationSpeed.h"
#include "chrono/core/ChRealtimeStep.h"
//#include "chrono/physics/ChMaterialSurfaceNSC.h"
//#include "chrono/physics/ChLinkLock.h"
 
#ifdef CHRONO_COLLISION
    #include "chrono/collision/chrono/ChCollisionSystemChrono.h"
#endif

using namespace chrono;
ChCollisionSystemType collision_type = ChCollisionSystemType::BULLET;

template <typename BodyType>
std::string addNextFrame(const BodyType& body, std::string ending) {
    std::string s = "";
    ChVector<double> curr = body->GetPos();
    ChQuaternion<double> rot = body->GetRot();
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
    s += std::to_string(my_e3) + ending;

    return s;
}

double getZRotationFromQuaternion(double w, double x, double y, double z) {
    double sinThetaOver2 = sqrt(x*x + y*y + z*z);
    if (sinThetaOver2 == 0.0) return 0.0;
    double sign = z < 0 ? -1.0 : 1.0;
    return sign * 2.0 * atan2(sinThetaOver2, w);
}

void saveStringToFile(std::string s, std::string fileName) {
    std::ofstream outputFile(fileName);
    if (outputFile.is_open()) {
        outputFile << s;
        outputFile.close();
    }
}

double getZAngularVelocityFromQuaternion(double w, double x, double y, double z) {
    double zAngularVelocity = 2 * (w * z + x * y);
    return zAngularVelocity;
}

int main(int argc, char* argv[]) {
    // Set path to Chrono data directory
    SetChronoDataPath(CHRONO_DATA_DIR);

    ChSystemNSC sys;
    sys.SetCollisionSystemType(collision_type);
 
    // Settings specific to Chrono multicore collision system
    if (collision_type == ChCollisionSystemType::CHRONO) {
#ifdef CHRONO_COLLISION
        auto collsys = std::static_pointer_cast<ChCollisionSystemChrono>(sys.GetCollisionSystem());
        // Change the default number of broadphase bins
        collsys->SetBroadphaseGridResolution(ChVector<int>(20, 20, 2));
        // Change default narrowphase algorithm
        collsys->SetEnvelope(0.005);
        // Enable active bounding box
        int boxSize = 20;
        collsys->EnableActiveBoundingBox(ChVector<>(-boxSize, -10, -boxSize), ChVector<>(+boxSize, 10, +boxSize));
        // Set number of threads used by the collision detection system
        collsys->SetNumThreads(4);
#endif
    }
    
    auto cart_mat = chrono_types::make_shared<ChMaterialSurfaceNSC>();
    auto cart_body = std::make_shared<ChBodyEasyBox>(5.0, 2.0, 2.0,  // dimensions of the cart
        200, cart_mat, collision_type);
    cart_body->SetPos(ChVector<>(0, -3, 0));

    auto pole_body = std::make_shared<ChBodyEasyCylinder>(
        geometry::ChAxis::Y, 0.12, 6, 90, // radius, height, density
        chrono_types::make_shared<ChMaterialSurfaceNSC>(), collision_type);
    pole_body->SetPos(ChVector<>(0, 1.5, 0));
    auto joint_pole = std::make_shared<ChLinkLockRevolute>();
    joint_pole->Initialize(pole_body, cart_body, ChCoordsys<>(ChVector<>(0, -1.5, 0), Q_from_AngZ(CH_C_PI_2)));


    auto weight_body = std::make_shared<ChBodyEasyCylinder>(
        geometry::ChAxis::Y, 0.6, 1.2, 200, // radius, height, density
        chrono_types::make_shared<ChMaterialSurfaceNSC>(), collision_type);
    weight_body->SetPos(ChVector<>(0, 4.5, 0));
    auto joint_weight = std::make_shared<ChLinkLockLock>();
    joint_weight->Initialize(pole_body, weight_body, ChCoordsys<>(ChVector<>(0, 3.5, 0)));

    double wheel_radius = 0.8;
    double wheel_width = 3.0;  // Increase the wheel width
    auto wheel_mat = chrono_types::make_shared<ChMaterialSurfaceNSC>();
    auto wheel_FL = std::make_shared<ChBodyEasyCylinder>(
        geometry::ChAxis::Z, wheel_radius, wheel_width,
        20, wheel_mat, collision_type
    );
    auto wheel_FR = std::make_shared<ChBodyEasyCylinder>(
        geometry::ChAxis::Z, wheel_radius, wheel_width,
        20, wheel_mat, collision_type
    );
    wheel_FL->SetPos(ChVector<>(-1.5, -3.7, 0));
    wheel_FR->SetPos(ChVector<>(1.5, -3.7, 0));

    auto joint_FL = std::make_shared<ChLinkLockRevolute>();
    joint_FL->Initialize(wheel_FL, cart_body, ChCoordsys<>(wheel_FL->GetPos(), Q_from_AngZ(CH_C_PI_2)));

    //auto joint_FR = std::make_shared<ChLinkLockCylindrical>();
    auto joint_FR = std::make_shared<ChLinkLockRevolute>();
    joint_FR->Initialize(wheel_FR, cart_body, ChCoordsys<>(wheel_FR->GetPos(), Q_from_AngZ(CH_C_PI_2)));

    auto ground_mat = chrono_types::make_shared<ChMaterialSurfaceNSC>();
    auto ground = std::make_shared<ChBodyEasyBox>(40.0, 10.0, 40.0,  // dimensions of the floor
        0, // density (set to 0 for static bodies)
        ground_mat, collision_type);
    ground->SetPos(ChVector<>(0, -9.5, 0));  // Set position just below the wheels
    ground->SetBodyFixed(true);


    wheel_FL->GetCollisionModel()->SetFamily(1);
    wheel_FR->GetCollisionModel()->SetFamily(1);
    cart_body->GetCollisionModel()->SetFamily(1);
    wheel_FL->GetCollisionModel()->SetFamilyMaskNoCollisionWithFamily(1);
    wheel_FR->GetCollisionModel()->SetFamilyMaskNoCollisionWithFamily(1);
    cart_body->GetCollisionModel()->SetFamilyMaskNoCollisionWithFamily(1);
    pole_body->GetCollisionModel()->SetFamily(2);
    weight_body->GetCollisionModel()->SetFamily(2);
    pole_body->GetCollisionModel()->SetFamilyMaskNoCollisionWithFamily(2);
    weight_body->GetCollisionModel()->SetFamilyMaskNoCollisionWithFamily(2);

    sys.AddBody(cart_body);
    sys.AddBody(wheel_FL);
    sys.AddBody(wheel_FR);
    sys.AddBody(ground);
    sys.AddBody(pole_body);
    sys.AddBody(weight_body);
    sys.AddLink(joint_FL);
    sys.AddLink(joint_FR);
    sys.AddLink(joint_pole);
    sys.AddLink(joint_weight);

    std::vector<std::string> ss(5, "");
    for (int i = 0; i < ss.size(); i++) ss[i].reserve(1000000);
    
    for (int i = 0; i < 15000; i++) {

        if (i < 2) { weight_body->Accumulate_force(ChVector<>(7650,0,0), weight_body->GetPos(), false); }
        if (i == 2) { weight_body->Empty_forces_accumulators(); }

        auto rot = pole_body->GetRot();
        double th = getZRotationFromQuaternion(rot.e0(), rot.e1(), rot.e2(), rot.e3());
        double desiredTh = 0.01 * (cart_body->GetPos().x());
        double force = (th < desiredTh ? 30000: -30000) - 10000 * th;
        cart_body->Empty_forces_accumulators();
        cart_body->Accumulate_force(ChVector<>(force,0,0), cart_body->GetPos(), false);

        sys.DoStepDynamics(0.01666667);

        ss[0] += addNextFrame(cart_body, "\n");
        ss[1] += addNextFrame(wheel_FL, "\n");
        ss[2] += addNextFrame(wheel_FR, "\n");
        ss[3] += addNextFrame(pole_body, "\n");
        ss[4] += addNextFrame(weight_body, "\n");
        if (i % 100 == 99) { std::cout << "iters done: " << i + 1 << std::endl; }
    }
    saveStringToFile(ss[0], "../public/assets/text/cart.txt");
    saveStringToFile(ss[1], "../public/assets/text/wheel1.txt");
    saveStringToFile(ss[2], "../public/assets/text/wheel2.txt");
    saveStringToFile(ss[3], "../public/assets/text/pole.txt");
    saveStringToFile(ss[4], "../public/assets/text/weight.txt");
    return 0;
}
