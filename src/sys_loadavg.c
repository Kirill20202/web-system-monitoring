#include <stdio.h>
#include <stdlib.h>

int main() {
    double load[3];
    if (getloadavg(load, 3) == -1) {
        fprintf(stderr, "Failed to get load average\n");
        return 1;
    }

    printf("%.2f, %.2f, %.2f\n", load[0], load[1], load[2]);
    return 0;
}