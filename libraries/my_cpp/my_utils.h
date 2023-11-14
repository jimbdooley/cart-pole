#ifndef MY_UTILS_H
#define MY_UTILS_H

#include <vector>
#include <string>
#include <iostream>
#include <fstream>
#include <algorithm>
#include <cmath>

std::string myReadFile(std::string& s);
void saveStringToFile(std::string s, std::string fileName);

double getZRotationFromQuaternion(double w, double x, double y, double z);

double getZAngularVelocityFromQuaternion(double w, double x, double y, double z);

#endif