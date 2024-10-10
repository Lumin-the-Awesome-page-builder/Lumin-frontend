#!/bin/bash
statements_line=$(grep "Statements" coverage-report.txt)
functions_line=$(grep "Functions" coverage-report.txt)
lines_line=$(grep "Lines" coverage-report.txt)

statements_pre_percentage=$(echo "$statements_line" | awk -F'[:]' '{print $2}')
statements_percentage=$(echo "$statements_pre_percentage" | sed 's/%.*//' | cut -c2-)

functions_pre_percentage=$(echo "$functions_line" | awk -F'[:]' '{print $2}')
functions_percentage=$(echo "$functions_pre_percentage" | sed 's/%.*//' | cut -c2-)

lines_pre_percentage=$(echo "$lines_line" | awk -F'[:]' '{print $2}')
lines_percentage=$(echo "$lines_pre_percentage" | sed 's/%.*//' | cut -c2-)

is_less_than_80() {
    local value=$1
    if (( $(echo "$value < 1" | bc -l) )); then
        return 0
    else
        return 1
    fi
}

# Проверка условий
if is_less_than_80 "$statements_percentage" && is_less_than_80 "$functions_percentage" && is_less_than_80 "$lines_percentage"; then
    echo "false"
    exit 1
else
    echo "true"
    exit 0
fi