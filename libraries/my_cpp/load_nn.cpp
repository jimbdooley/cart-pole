
#include "load_nn.h"

void nnMatrixVectorMultiply(std::vector<std::vector<double>>& m, std::vector<double>& v, std::vector<double>& dst) {
    for (size_t i = 0; i < m.size(); ++i) {
        dst[1+i] = 0.0;
        for (size_t j = 0; j < m[0].size(); ++j) {
            dst[1+i] += m[i][j] * v[j];
        }
    }
}

void matrixVectorMultiply(std::vector<std::vector<double>>& m, std::vector<double>& v, std::vector<double>& dst) {
    for (size_t i = 0; i < m.size(); ++i) {
        dst[i] = 0.0;
        for (size_t j = 0; j < m[0].size(); ++j) {
            dst[i] += m[i][j] * v[j];
        }
    }
}

BasicNN::BasicNN(const std::string& file_str) {
    size = 0;
    std::vector<std::vector<double>> temp;
    std::vector<double> row;
    bool inNumber = false;
    bool inMatrix = false;
    bool inLine = false;
    std::string curr = "";
    for (int i = 0; i < file_str.length(); i++) {
        if (file_str[i] != '\n' && file_str[i] != '#' && file_str[i] != ',') {
            if (file_str[i-1] == '\n' || file_str[i-1] == ',') {
                curr = file_str[i];
            } else {
                curr += file_str[i];
            }
        }
        if (file_str[i] == ',') {
            row.push_back(std::stod(curr));
        }
        if (file_str[i] == '\n') {
            if (file_str[i-1] != '#') {
                row.push_back(std::stod(curr));
                temp.push_back(row);
                row = std::vector<double>();
            }
            if (i == file_str.length()-1) {
                nn.push_back(temp);
                layers.push_back(std::vector<double>(temp[0].size(), 1.0));
                size += 1;
            } else {
                if (file_str[i+1] == '#') {
                    layers.push_back(std::vector<double>(temp[0].size(), 1.0));
                    nn.push_back(temp);
                    temp = std::vector<std::vector<double>>();
                    size += 1;
                }
            }
        }
    }
    output = std::vector<double>(nn[nn.size()-1].size(), 1.0);
    input = std::vector<double>(nn[0][0].size() - 1, 1.0);
}

void BasicNN::forward() {
    for (int i = 0; i < input.size(); i++) {
        layers[0][1+i] = input[i];
    }
    for (int i = 0; i < nn.size() - 1; i++) {
        nnMatrixVectorMultiply(nn[i], layers[i], layers[i+1]);
        for (int j = 0; j < layers[i+1].size(); j++) {
            layers[i+1][j] = layers[i+1][j] < 0.0 ? 0.0 : layers[i+1][j];
        }
    }
    int finalI = nn.size() - 1;
    matrixVectorMultiply(nn[finalI], layers[finalI], output);
}

