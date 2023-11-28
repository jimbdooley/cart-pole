
def to_csv(model):
    s = ""
    for layer in model.layers:
        wb = layer.get_weights()
        w = wb[0]
        b = wb[1]
        s += "#\n"
        for i in range(len(b)):
            s += str(b[i])
            for j in range(len(w)):
                s += "," + str(w[j][i])
            s += "\n"
    with open(model_loc, "w") as f:
        f.write(s)