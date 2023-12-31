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
#include <random>
#include <filesystem>
#include "../../libraries/my_cpp/my_utils.h"
#include "../../libraries/my_cpp/load_nn.h"
 
#ifdef CHRONO_COLLISION
    #include "chrono/collision/chrono/ChCollisionSystemChrono.h"
#endif

using namespace chrono;
ChCollisionSystemType collision_type = ChCollisionSystemType::BULLET;


void replace_all(std::string& str, const std::string& from, const std::string& to) {
    size_t startPos = 0;
    while ((startPos = str.find(from, startPos)) != std::string::npos) {
        str.replace(startPos, from.length(), to);
        startPos += to.length(); // Move past the replaced string
    }
}


template <typename BodyType>
std::string addNextFrame(const BodyType& body, std::string ending) {
    ChVector<double> curr = body->GetPos();
    ChQuaternion<double> rot = body->GetRot();

    std::string oneToReplace = "1.0000";
    std::string zeroToReplace = "0.0000";
    int precision = oneToReplace.length() - 2;

    std::ostringstream stream;
    stream << std::fixed << std::setprecision(precision);
    stream << curr.x() << ",";
    stream << curr.y() << ",";
    stream << curr.z() << ",";
    stream << static_cast<double>(rot.e0()) << ",";
    stream << static_cast<double>(rot.e1()) << ",";
    stream << static_cast<double>(rot.e2()) << ",";
    stream << static_cast<double>(rot.e3()) << ending;
    std::string rtn = stream.str();
    
    replace_all(rtn, oneToReplace, "1");
    replace_all(rtn, zeroToReplace, "0");
    for (int i = 0; i < precision - 1; i++) {
        replace_all(rtn, "00,", "0,");
        replace_all(rtn, "00\n,", "0\n");
    }

    return rtn;
}


double getRand(double low, double high) {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_real_distribution<double> distribution(low, high);
    return distribution(gen);
}

std::vector<std::shared_ptr<ChBody>> makeSim(ChSystemNSC& sys) {
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

    double xStart = getRand(-1.5, 1.5);
    
    auto cart_mat = chrono_types::make_shared<ChMaterialSurfaceNSC>();
    auto cart_body = std::make_shared<ChBodyEasyBox>(5.0, 2.0, 2.0,  // dimensions of the cart
        200, cart_mat, collision_type);
    cart_body->SetPos(ChVector<>(xStart, -3, 0));

    auto pole_body = std::make_shared<ChBodyEasyCylinder>(
        geometry::ChAxis::Y, 0.12, 6, 90, // radius, height, density
        chrono_types::make_shared<ChMaterialSurfaceNSC>(), collision_type);
    pole_body->SetPos(ChVector<>(xStart, 1.5, 0));
    auto joint_pole = std::make_shared<ChLinkLockRevolute>();
    joint_pole->Initialize(pole_body, cart_body, ChCoordsys<>(ChVector<>(xStart, -1.5, 0), Q_from_AngZ(CH_C_PI_2)));


    auto weight_body = std::make_shared<ChBodyEasyCylinder>(
        geometry::ChAxis::Y, 0.6, 1.2, 200, // radius, height, density
        chrono_types::make_shared<ChMaterialSurfaceNSC>(), collision_type);
    weight_body->SetPos(ChVector<>(xStart, 4.5, 0));
    auto joint_weight = std::make_shared<ChLinkLockLock>();
    joint_weight->Initialize(pole_body, weight_body, ChCoordsys<>(ChVector<>(xStart, 3.5, 0)));

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
    wheel_FL->SetPos(ChVector<>(xStart - 1.5, -3.7, 0));
    wheel_FR->SetPos(ChVector<>(xStart + 1.5, -3.7, 0));

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

    std::vector<std::shared_ptr<ChBody>> rtn;
    rtn.push_back(cart_body);
    rtn.push_back(wheel_FL);
    rtn.push_back(wheel_FR);
    rtn.push_back(ground);
    rtn.push_back(pole_body);
    rtn.push_back(weight_body);
    return rtn;
}

int main(int argc, char* argv[]) {
    if (argc < 3) {
        std::cerr << "Usage: " << argv[0] << " \"data\"" << std::endl;
        return 1; 
    }

    std::string root = "../../";
    if (argc >= 4) root = argv[3];

    std::string modelDir = root + "cartAI_model.csv";
    auto nn = BasicNN(myReadFile(modelDir));
    if (nn.size == 0) {
        std::cerr << "Unable to load nn" << std::endl;
        return 1;
    }

    double exploreFactor = std::stod(argv[1]) * 0.01;
    std::string inputData = argv[2];
    std::string dir  = root + "public/scripts/" + inputData;
    std::cout << "saving scripts to " << dir << std::endl;
    if (!std::filesystem::exists(dir)) {
        if (std::filesystem::create_directory(dir)) {
            std::cout << "Directory created successfully: " << dir << std::endl;
        } else {
            std::cerr << "Error creating directory: " << dir << std::endl;
            return 1; 
        }
    }


    SetChronoDataPath(CHRONO_DATA_DIR);

    ChSystemNSC sys;
    auto els = makeSim(sys);
    auto cart_body = els[0];
    auto wheel_FL = els[1];
    auto wheel_FR = els[2];
    auto pole_body = els[4];
    auto weight_body = els[5];

    std::vector<std::string> ss(6, "");
    for (int i = 0; i < ss.size(); i++) ss[i].reserve(1000000);
    double startImpulse = getRand(-3000.0, 3000.0);
    startImpulse = startImpulse < 0.0 ? startImpulse - 4650.0 : startImpulse + 4650.0;
    
    double prevTh = 0.0;
    double prevX = 0.0;

    std::random_device rd;
    std::mt19937 explore(rd());
    std::uniform_real_distribution<double> distribution(0.0, 1.0);
    std::random_device rd2;
    std::mt19937 explore2(rd2());
    std::uniform_real_distribution<double> distribution2(0.0, 1.99999999);
    
    for (int i = 0; i < 3000; i++) {

        if (i < 2) { weight_body->Accumulate_force(ChVector<>(startImpulse, 0.0, 0.0), weight_body->GetPos(), false); }
        if (i == 2) { weight_body->Empty_forces_accumulators(); }


        double cartX = cart_body->GetPos().x();
        auto rot = pole_body->GetRot();
        double poleTh = getZRotationFromQuaternion(rot.e0(), rot.e1(), rot.e2(), rot.e3());
        if(abs(poleTh) > 1.7) {
            std::cout << "breaking early i = " << i << std::endl;
            break;
        }

        double cartVel = 60.0*(cartX-prevX);
        double poleVel = 60.0*(poleTh-prevTh);
        int choice = 0;
        double bestChoiceVal = -999999.9;

        float forceNegative = cartVel > 0.0 && poleVel > 0.0 && poleTh > 0.2;
        float forcePositive = cartVel < 0.0 && poleVel < 0.0 && poleTh < -0.2;

        if (forcePositive) {
            choice = 1;
        } else if (forceNegative) {
            choice = 0;
        } else if (distribution(explore) < exploreFactor) {
            choice = (int)distribution2(explore2);
        } else {
            nn.input[0] = cartX;
            nn.input[1] = cartVel;
            nn.input[2] = poleTh;
            nn.input[3] = poleVel;

            for (int i = 0; i < 2; i++) {
                nn.input[4+i] = 1.0;
                nn.forward();
                if (nn.output[0] > bestChoiceVal) {
                    bestChoiceVal = nn.output[0];
                    choice = i;
                }
                nn.input[4+i] = 0.0;
            }
        }

        double force = ((double)(choice)*8.0 - 4.0) * 10000.0;

        cart_body->Empty_forces_accumulators();
        cart_body->Accumulate_force(ChVector<>(force,0,0), cart_body->GetPos(), false);

        sys.DoStepDynamics(0.01666667);

        ss[0] += addNextFrame(cart_body, "\n");
        ss[1] += addNextFrame(wheel_FL, "\n");
        ss[2] += addNextFrame(wheel_FR, "\n");
        ss[3] += addNextFrame(pole_body, "\n");
        ss[4] += addNextFrame(weight_body, "\n");
        ss[5] += std::to_string(cartX) + ",";
        ss[5] += std::to_string(cartVel) + ",";
        ss[5] += std::to_string(poleTh) + ",";
        ss[5] += std::to_string(poleVel) + ",";
        ss[5] += std::to_string(choice) + "\n";
        prevX = cartX;
        prevTh = poleTh;
        
    }
    saveStringToFile(ss[0], dir + "/cart.txt");
    saveStringToFile(ss[1], dir + "/wheel1.txt");
    saveStringToFile(ss[2], dir + "/wheel2.txt");
    saveStringToFile(ss[3], dir + "/pole.txt");
    saveStringToFile(ss[4], dir + "/weight.txt");
    saveStringToFile(ss[5], dir + "/scores.txt");
    return 0;
}
