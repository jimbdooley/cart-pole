
#include "my_utils.h"

void saveStringToFile(std::string s, std::string fileName) {
    std::ofstream outputFile(fileName);
    if (outputFile.is_open()) {
        outputFile << s;
        outputFile.close();
    }
}

std::string myReadFile(std::string& s) {
    std::ifstream file(s);

    if (file.is_open()) {
        std::string content((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
        file.close();
        return content;
    } else {
        std::cerr << "Unable to open file: " << s << std::endl;
        return "";
    }
}

double getZRotationFromQuaternion(double w, double x, double y, double z) {
    double sinThetaOver2 = sqrt(x*x + y*y + z*z);
    if (sinThetaOver2 == 0.0) return 0.0;
    double sign = z < 0 ? -1.0 : 1.0;
    return sign * 2.0 * atan2(sinThetaOver2, w);
}


double getZAngularVelocityFromQuaternion(double w, double x, double y, double z) {
    double zAngularVelocity = 2 * (w * z + x * y);
    return zAngularVelocity;
}