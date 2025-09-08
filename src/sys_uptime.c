#include <stdio.h>
#include <stdlib.h>
#include <sys/sysinfo.h>

int main() {
    struct sysinfo info;
    if (sysinfo(&info) != 0) {
        fprintf(stderr, "Failed to get sysinfo\n");
        return 1;
    }

    long uptime_seconds = info.uptime;
    long days = uptime_seconds / 86400;
    long hours = (uptime_seconds % 86400) / 3600;
    long minutes = (uptime_seconds % 3600) / 60;
    long seconds = uptime_seconds % 60;

    printf("%ld days, %ld hours, %ld minutes, %ld seconds\n",
           days, hours, minutes, seconds);

    return 0;
}