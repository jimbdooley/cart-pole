EXE_PATH="./cartAI"


for ((i = 0; i < 500; i++)); do
    if [ $((i % 50)) -eq 0 ]; then
        num=$((i / 5))
        ./cartAI "$num"
        python your_script.py
    fi
done
