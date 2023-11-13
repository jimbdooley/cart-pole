#ifndef LOAD_NN_H
#define LOAD_NN_H

#include <vector>
#include <string>
#include <iostream>
#include <fstream>

class BasicNN {
private:
    std::vector<std::vector<double>> layers;
    std::vector<std::vector<std::vector<double>>> nn;

public:
    int size;
    std::vector<double> input;
    std::vector<double> output;
    BasicNN(const std::string& file_str);
    void forward();
};

std::string myReadFile(std::string& s);

void matrixVectorMultiply(std::vector<std::vector<double>>& m, std::vector<double>& v, std::vector<double>& dst);
void nnMatrixVectorMultiply(std::vector<std::vector<double>>& m, std::vector<double>& v, std::vector<double>& dst);

#endif
