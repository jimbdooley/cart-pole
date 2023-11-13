EXE_PATH="./cartAI"

# Number of times to run the executable
NUM_RUNS=100

# Loop to run the executable with different variables
for ((i=0; i<50; i++)); do
    VAR1="value_$i"  # Replace with the variable you want to pass
    VAR2="$i"  # Replace with another variable
    $EXE_PATH 25 "$VAR2"  # Adjust this depending on your executable's requirements
done