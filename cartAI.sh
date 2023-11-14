EXE_PATH="./cartAI"


for ((i = 0; i < 1; i++)); do
    VAR="$i"
    RAND=$((i % 10))
    $EXE_PATH 99 "$VAR"
done